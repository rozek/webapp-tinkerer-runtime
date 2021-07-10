/*******************************************************************************
*                                                                              *
*                        WebApp Tinkerer (WAT) Runtime                         *
*                                                                              *
*******************************************************************************/

import $           from 'jquery'
import download    from 'downloadjs'
import localforage from 'localforage'
import {
  global, throwError,
  ValueIsString, ValueIsStringMatching, ValueIsFiniteNumber, ValueIsNumberInRange,
  ValueIsTextline,
  ValidatorForClassifier, acceptNil, rejectNil
} from 'javascript-interface-library'
import * as JIL from 'javascript-interface-library'


namespace WAT {
  export const Version = '0.1.0'

/**** check any requirements ****/

  if ((typeof jQuery !== 'function') || (jQuery.fn == null)) {
    window.alert(
      '"jQuery" not found\n\n' +
      'The WebApp Tinkerer needs "jQuery" to be loaded first'
    )
    throw new Error('MissingDependency: "jQuery" not found')
  }

/**** common types and values ****/

  type WAT_uniqueId = string

  export const WAT_Categories = ['Applet','Card','Overlay','Control','Compound']
  export type  WAT_Category   = typeof WAT_Categories[number]

  export type WAT_SemVer = string            // mainly for illustrative purposes
  type WAT_Version = {     // not to be exported, users should stick with SemVer
    major:number, minor?:number, Patch?:number, Build?:number
  }

/**** layout setting types ****/

  export type WAT_Location  = number         // mainly for illustrative purposes
  export type WAT_Dimension = number                                     // dto.
  export type WAT_Position  = { x:WAT_Location,y:WAT_Location }
  export type WAT_Size      = { Width:WAT_Dimension,Height:WAT_Dimension }
  export type WAT_Geometry  = { x:WAT_Location,y:WAT_Location, Width:WAT_Dimension,Height:WAT_Dimension }

  export const WAT_horizontalAnchorings = ['left-width','left-right','width-right']
  export type  WAT_horizontalAnchoring  = typeof WAT_horizontalAnchorings[number]

  export const WAT_verticalAnchorings = ['top-height','top-bottom','height-bottom']
  export type  WAT_verticalAnchoring  = typeof WAT_verticalAnchorings[number]

  export type WAT_horizontalOffsets = [ WAT_Location|WAT_Dimension, WAT_Location|WAT_Dimension ]
  export type WAT_verticalOffsets   = [ WAT_Location|WAT_Dimension, WAT_Location|WAT_Dimension ]

/**** visual setting types ****/

  export const WAT_FontWeights = [
    'thin', 'extra-light', 'light', 'normal', 'medium', 'semi-bold',
    'bold', 'extra-bold', 'heavy', 'lighter', 'bolder'
  ]
  export type WAT_FontWeight = typeof WAT_FontWeights[number]

  const WAT_FontWeightValues = Object.assign(Object.create(null),{
    'thin':100, 'extra-light':200, 'light':300, 'normal':400, 'medium':500,
    'semi-bold':600, 'bold':700, 'extra-bold':800, 'heavy':900
  })

  export const WAT_FontStyles = [ 'normal',  'italic' ]
  export type  WAT_FontStyle  = typeof WAT_FontStyles[number]

  export const WAT_TextDecorationLines = [ 'none','underline','overline','line-through' ]
  export type  WAT_TextDecorationLine  = typeof WAT_TextDecorationLines[number]

  export const WAT_TextDecorationStyles = [ 'solid','double','dotted','dashed','wavy' ]
  export type  WAT_TextDecorationStyle  = typeof WAT_TextDecorationStyles[number]

  export type WAT_TextDecoration = {
    Line:       WAT_TextDecorationLine,
    Color?:     WAT_Color,          // "null" or "undefined" mean "currentColor"
    Style?:     WAT_TextDecorationStyle,
    Thickness?: WAT_Dimension          // "null" or "undefined" mean "from-font"
  }

  export type WAT_TextShadow = {
    xOffset:   WAT_Location,
    yOffset:   WAT_Location,
    BlurRadius:WAT_Dimension,
    Color:     WAT_Color                   // Color = "transparent" means "none"
  }

  export const WAT_TextAlignments = [ 'left','center','right','justify' ]
  export type  WAT_TextAlignment  = typeof WAT_TextAlignments[number]

  export const WAT_BackgroundModes = [ 'normal','contain','cover','fill','tile' ]
  export type  WAT_BackgroundMode  = typeof WAT_BackgroundModes[number]

  export type WAT_BackgroundTexture = {
    ImageURL:WAT_URL,
    Mode:    WAT_BackgroundMode,
    xOffset: WAT_Location,
    yOffset: WAT_Location
  }

  export const WAT_BorderStyles = [
    'none', 'dotted', 'dashed', 'solid', 'double',
    'groove', 'ridge', 'inset', 'outset'
  ]
  export type WAT_BorderStyle = typeof WAT_BorderStyles[number]

  export type WAT_BoxShadow = {
    isInset:     boolean,
    xOffset:     WAT_Location,
    yOffset:     WAT_Location,
    BlurRadius:  WAT_Dimension,
    SpreadRadius:WAT_Dimension,
    Color:       WAT_Color                 // Color = "transparent" means "none"
  }

  export const WAT_Cursors = [
    'alias', 'all-scroll', 'auto', 'cell', 'context-menu', 'col-resize', 'copy',
    'crosshair', 'default', 'e-resize', 'ew-resize', 'grab', 'grabbing', 'help',
    'move', 'n-resize', 'ne-resize', 'nesw-resize', 'ns-resize', 'nw-resize',
    'nwse-resize', 'no-drop', 'none', 'not-allowed', 'pointer', 'progress',
    'row-resize', 's-resize', 'se-resize', 'sw-resize', 'text', 'vertical-text',
    'w-resize', 'wait', 'zoom-in', 'zoom-out'
  ]
  export type WAT_Cursor = typeof WAT_Cursors[number]

  export type WAT_customCursor = {
    ImageURL:WAT_URL,
    xOffset: WAT_Location,
    yOffset: WAT_Location
  }

  export const WAT_Overflows = [ 'visible',  'hidden',  'scroll',  'auto' ]
  export type  WAT_Overflow  = typeof WAT_Overflows[number]

  export const WAT_TextOverflows = ['clip',  'ellipsis']
  export type  WAT_TextOverflow  = typeof WAT_TextOverflows[number]

/**** additional data types ****/

  export type WAT_Text     = string          // mainly for illustrative purposes
  export type WAT_Textline = string                                      // dto.
  export type WAT_Color    = string                                      // dto.
  export type WAT_URL      = string                                      // dto.

/**** re-export contents of javascript-interface-library ****/

  for (let Key in JIL) {
// @ts-ignore don't worry about typing
    if (Object.prototype.hasOwnProperty.call(JIL,Key)) { WAT[Key] = JIL[Key] }
  }

/**** ValueIsElement ****/

  export function ValueIsElement (Value:any):boolean {
    return (Value instanceof HTMLElement)
  }

/**** allow/expect[ed]Element ****/

  export const allowElement = ValidatorForClassifier(
    ValueIsElement, acceptNil, 'DOM element'
  ), allowedElement = allowElement

  export const expectElement = ValidatorForClassifier(
    ValueIsElement, rejectNil, 'DOM element'
  ), expectedElement = expectElement

/**** ValueIs$Instance ****/

  export function ValueIs$Instance (Value:any):boolean {
    return (Value instanceof $)
  }

/**** allow/expect[ed]$Instance ****/

  export const allow$Instance = ValidatorForClassifier(
    ValueIs$Instance, acceptNil, '"jQuery" instance'
  ), allowed$Instance = allow$Instance

  export const expect$Instance = ValidatorForClassifier(
    ValueIs$Instance, rejectNil, '"jQuery" instance'
  ), expected$Instance = expect$Instance

/**** ValueIsVisual ****/

  export function ValueIsVisual (Value:any):boolean {
    return (Value instanceof WAT_Visual)
  }

/**** allow/expect[ed]Visual ****/

  export const allowVisual = ValidatorForClassifier(
    ValueIsVisual, acceptNil, 'WAT visual'
  ), allowedVisual = allowVisual

  export const expectVisual = ValidatorForClassifier(
    ValueIsVisual, rejectNil, 'WAT visual'
  ), expectedVisual = expectVisual

/**** ValueIsApplet ****/

  export function ValueIsApplet (Value:any):boolean {
    return (Value instanceof WAT_Applet)
  }

/**** allow/expect[ed]Applet ****/

  export const allowApplet = ValidatorForClassifier(
    ValueIsApplet, acceptNil, 'WAT applet'
  ), allowedApplet = allowApplet

  export const expectApplet = ValidatorForClassifier(
    ValueIsApplet, rejectNil, 'WAT applet'
  ), expectedApplet = expectApplet

/**** ValueIsCard ****/

  export function ValueIsCard (Value:any):boolean {
    return (Value instanceof WAT_Card)
  }

/**** allow/expect[ed]Card ****/

  export const allowCard = ValidatorForClassifier(
    ValueIsCard, acceptNil, 'WAT card'
  ), allowedCard = allowCard

  export const expectCard = ValidatorForClassifier(
    ValueIsCard, rejectNil, 'WAT card'
  ), expectedCard = expectCard

/**** ValueIsOverlay ****/

  export function ValueIsOverlay (Value:any):boolean {
    return (Value instanceof WAT_Overlay)
  }

/**** allow/expect[ed]Overlay ****/

  export const allowOverlay = ValidatorForClassifier(
    ValueIsOverlay, acceptNil, 'WAT overlay'
  ), allowedOverlay = allowOverlay

  export const expectOverlay = ValidatorForClassifier(
    ValueIsOverlay, rejectNil, 'WAT overlay'
  ), expectedOverlay = expectOverlay

/**** ValueIsControl ****/

  export function ValueIsControl (Value:any):boolean {
    return (Value instanceof WAT_Control)
  }

/**** allow/expect[ed]Control ****/

  export const allowControl = ValidatorForClassifier(
    ValueIsControl, acceptNil, 'WAT control'
  ), allowedControl = allowControl

  export const expectControl = ValidatorForClassifier(
    ValueIsControl, rejectNil, 'WAT control'
  ), expectedControl = expectControl

/**** ValueIsCompound ****/

  export function ValueIsCompound (Value:any):boolean {
    return (Value instanceof WAT_Compound)
  }

/**** allow/expect[ed]Compound ****/

  export const allowCompound = ValidatorForClassifier(
    ValueIsCompound, acceptNil, 'WAT compound'
  ), allowedCompound = allowCompound

  export const expectCompound = ValidatorForClassifier(
    ValueIsCompound, rejectNil, 'WAT compound'
  ), expectedCompound = expectCompound

/**** ValueIsComponent ****/

  export function ValueIsComponent (Value:any):boolean {
    return (Value instanceof WAT_Control) || (Value instanceof WAT_Compound)
  }

/**** allow/expect[ed]Component ****/

  export const allowComponent = ValidatorForClassifier(
    ValueIsComponent, acceptNil, 'WAT component'
  ), allowedComponent = allowComponent

  export const expectComponent = ValidatorForClassifier(
    ValueIsComponent, rejectNil, 'WAT component'
  ), expectedComponent = expectComponent

/**** ValueIsContainer ****/

  export function ValueIsContainer (Value:any):boolean {
    return (Value instanceof WAT_Container)
  }

/**** allow/expect[ed]Container ****/

  export const allowContainer = ValidatorForClassifier(
    ValueIsContainer, acceptNil, 'WAT container'
  ), allowedContainer = allowContainer

  export const expectContainer = ValidatorForClassifier(
    ValueIsContainer, rejectNil, 'WAT container'
  ), expectedContainer = expectContainer

/**** ValueIsUniqueId ****/

  const uniqueIdPattern = /^wat-[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i

  export function ValueIsUniqueId (Value:any):boolean {
    return (ValueIsString(Value) && uniqueIdPattern.test(Value))
  }

/**** allow/expect[ed]UniqueId ****/

  export const allowUniqueId = ValidatorForClassifier(
    ValueIsUniqueId, acceptNil, 'unique WAT id'
  ), allowedUniqueId = allowUniqueId

  export const expectUniqueId = ValidatorForClassifier(
    ValueIsUniqueId, rejectNil, 'unique WAT id'
  ), expectedUniqueId = expectUniqueId

/**** ValueIsId (i.e., HTML id) ****/

  export type WAT_Id = string                // mainly for illustrative purposes

  const WAT_IdPattern = /^[a-z][-_a-z.0-9]*$/i
// see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id

  export function ValueIsId (Value:any):boolean {
    return ValueIsStringMatching(Value, WAT_IdPattern)
  }

/**** allow/expect[ed]Id ****/

  export const allowId = ValidatorForClassifier(
    ValueIsId, acceptNil, 'WAT HTML id'
  ), allowedId = allowId

  export const expectId = ValidatorForClassifier(
    ValueIsId, rejectNil, 'WAT HTML id'
  ), expectedId = expectId

/**** ValueIsName ****/

  export type WAT_Name = string              // mainly for illustrative purposes

  const WAT_NamePattern = /^[a-z$_][a-z$_0-9]*(-[a-z$_][a-z$_0-9]*)*$/i

  export function ValueIsName (Value:any):boolean {
    return ValueIsStringMatching(Value, WAT_NamePattern)
  }

/**** allow/expect[ed]Name ****/

  export const allowName = ValidatorForClassifier(
    ValueIsName, acceptNil, 'WAT name'
  ), allowedName = allowName

  export const expectName = ValidatorForClassifier(
    ValueIsName, rejectNil, 'WAT name'
  ), expectedName = expectName

/**** ValueIsUniversalName ****/

  const WAT_UniversalNamePattern = /^#?[a-z$_][a-z$_0-9]*(-[a-z$_][a-z$_0-9]*)*$/i

  export function ValueIsUniversalName (Value:any):boolean {
    return ValueIsStringMatching(Value, WAT_UniversalNamePattern)
  }

/**** allow/expect[ed]UniversalName ****/

  export const allowUniversalName = ValidatorForClassifier(
    ValueIsUniversalName, acceptNil, 'WAT name'
  ), allowedUniversalName = allowUniversalName

  export const expectUniversalName = ValidatorForClassifier(
    ValueIsUniversalName, rejectNil, 'WAT name'
  ), expectedUniversalName = expectUniversalName

/**** ValueIsLabel ****/

  export type WAT_Label = string             // mainly for illustrative purposes

  export function ValueIsLabel (Value:any):boolean {
    return ValueIsTextline(Value)
  }

/**** allow/expect[ed]Label ****/

  export const allowLabel = ValidatorForClassifier(
    ValueIsLabel, acceptNil, 'WAT visual label'
  ), allowedLabel = allowLabel

  export const expectLabel = ValidatorForClassifier(
    ValueIsLabel, rejectNil, 'WAT visual label'
  ), expectedLabel = expectLabel

/**** ValueIsIdentifier ****/

  export type WAT_Identifier = string        // mainly for illustrative purposes

  const IdentifierPattern = /^[a-z$_][a-z$_0-9]*$/i

  export function ValueIsIdentifier (Value:any):boolean {
    return ValueIsStringMatching(Value, IdentifierPattern)
  }

/**** allow/expect[ed]Identifier ****/

  export const allowIdentifier = ValidatorForClassifier(
    ValueIsIdentifier, acceptNil, 'WAT identifier'
  ), allowedIdentifier = allowIdentifier

  export const expectIdentifier = ValidatorForClassifier(
    ValueIsIdentifier, rejectNil, 'WAT identifier'
  ), expectedIdentifier = expectIdentifier

/**** ValueIsLocation ****/

  export function ValueIsLocation (Value:any):boolean {
    return ValueIsNumberInRange(Value, 0,Infinity, true,false)
  }

/**** allow/expect[ed]Location ****/

  export const allowLocation = ValidatorForClassifier(
    ValueIsLocation, acceptNil, 'coordinate'
  ), allowedLocation = allowLocation

  export const expectLocation = ValidatorForClassifier(
    ValueIsLocation, rejectNil, 'coordinate'
  ), expectedLocation = expectLocation

/**** ValueIsDimension ****/

  export function ValueIsDimension (Value:any):boolean {
    return ValueIsFiniteNumber(Value) && (Value >= 0)
  }

/**** allow/expect[ed]Dimension ****/

  export const allowDimension = ValidatorForClassifier(
    ValueIsDimension, acceptNil, 'extent'
  ), allowedDimension = allowDimension

  export const expectDimension = ValidatorForClassifier(
    ValueIsDimension, rejectNil, 'extent'
  ), expectedDimension = expectDimension

/**** ValueIsSemVer ****/

  const SemVerPattern = /^(0|[1-9]\d*)(?:[.](0|[1-9]\d*)(?:[.](0|[1-9]\d*)(-[-0-9A-Za-z.]+)?)?)?$/
// pattern is not perfect, see https://semver.org/

  export function ValueIsSemVer (Value:any):boolean {
    return ValueIsStringMatching(Value, SemVerPattern)
  }

/**** allow/expect[ed]SemVer ****/

  export const allowSemVer = ValidatorForClassifier(
    ValueIsSemVer, acceptNil, 'version specification'
  ), allowedSemVer = allowSemVer

  export const expectSemVer = ValidatorForClassifier(
    ValueIsSemVer, rejectNil, 'version specification'
  ), expectedSemVer = expectSemVer

//----------------------------------------------------------------------------//
//                                 WAT_Visual                                 //
//----------------------------------------------------------------------------//

  export abstract class WAT_Visual {

  }

//----------------------------------------------------------------------------//
//                                 WAT_Applet                                 //
//----------------------------------------------------------------------------//

  export class WAT_Applet extends WAT_Visual {

  }

//----------------------------------------------------------------------------//
//                               WAT_Container                                //
//----------------------------------------------------------------------------//

  export abstract class WAT_Container extends WAT_Visual {

  }

//----------------------------------------------------------------------------//
//                                 WAT_Layer                                  //
//----------------------------------------------------------------------------//

  export abstract class WAT_Layer extends WAT_Container {

  }

//----------------------------------------------------------------------------//
//                                  WAT_Card                                  //
//----------------------------------------------------------------------------//

  export class WAT_Card extends WAT_Layer {

  }

//----------------------------------------------------------------------------//
//                                WAT_Overlay                                 //
//----------------------------------------------------------------------------//

  export class WAT_Overlay extends WAT_Layer {

  }

//----------------------------------------------------------------------------//
//                               WAT_Component                                //
//----------------------------------------------------------------------------//

  export interface WAT_Component {
/*
    Index:number
    mayBeDisplaced:boolean
    mayBeDeformed:boolean
    mayBeShiftedUp:boolean
    mayBeShiftedDown:boolean
    mayBeShiftedTo (newIndex:number):boolean
    shiftUp ():void
    shiftDown ():void
    shiftTo (newIndex:number):void
    remove ():void
*/
  }

//----------------------------------------------------------------------------//
//                                WAT_Compound                                //
//----------------------------------------------------------------------------//

  export class WAT_Compound extends WAT_Container implements WAT_Component {

  }

//----------------------------------------------------------------------------//
//                                WAT_Control                                 //
//----------------------------------------------------------------------------//

  export class WAT_Control extends WAT_Visual implements WAT_Component {

  }



  global.WAT = WAT
}
