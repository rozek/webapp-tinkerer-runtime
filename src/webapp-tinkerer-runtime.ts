/*******************************************************************************
*                                                                              *
*                        WebApp Tinkerer (WAT) Runtime                         *
*                                                                              *
*******************************************************************************/

  import download    from 'downloadjs'
  import localforage from 'localforage'

  import {
    global, throwError, quoted,
    ObjectIsEmpty,
    ValueIsBoolean,
    ValueIsFiniteNumber, ValueIsNumberInRange, ValueIsOrdinal,
    ValueIsString, ValueIsStringMatching,
    ValueIsText, ValueIsTextline, ValueIsArray, ValueIsFunction,
    ValueIsOneOf, ValueIsURL,
    allowBoolean, expectBoolean, expectedBoolean,
    expectedNumber, allowNumberInRange, expectNumberInRange, expectedNumberInRange,
    allowIntegerInRange, expectedIntegerInRange, allowOrdinal, expectOrdinal,
    allowString, expectedStringMatching, allowText, allowedText, expectText,
    allowTextline, allowedTextline, expectedTextline,
    allowFunction, allowedFunction, expectFunction, expectedFunction,
    expectObject, allowPlainObject, expectPlainObject, allowArray, expectedArray,
    allowOneOf, expectedOneOf, expectOneOf,
    allowColor, expectColor, expectURL,
    ValidatorForClassifier, acceptNil, rejectNil,
    ValuesAreEqual, HexColor, shortHexColor
  } from 'javascript-interface-library'
  import * as JIL from 'javascript-interface-library'

  export const Version = '0.1.0'

  const ReadyFunctionsToCall:Function[] = []     // "ready" will be called early

/**** common types and values ****/

  type WAT_uniqueId = string                                   // format "wat-#"

  export const WAT_Categories = ['Applet','Card','Overlay','Control','Compound']
  export type  WAT_Category   = typeof WAT_Categories[number]

  export type WAT_SemVer = string            // mainly for illustrative purposes
  type WAT_Version = {     // not to be exported, users should stick with SemVer
    major:number, minor?:number, Patch?:number, Build?:number
  }
  type WAT_normalizedVersion = {                           // not to be exported
    major:number, minor:number, Patch:number, Build:number
  }

  export type WAT_Id         = string        // mainly for illustrative purposes
  export type WAT_Name       = string                                    // dto.
  export type WAT_Label      = string                                    // dto.
  export type WAT_Identifier = string                                    // dto.

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

  export const WAT_FontWeightValues = Object.assign(Object.create(null),{
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

/**** ValueIsUniversalName - for global (reactive) variables ****/

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
    return ValueIsFiniteNumber(Value)
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

/**** throwReadOnlyError ****/

  export function throwReadOnlyError (Name:WAT_Name):never {
    throwError(
      'ReadOnlyProperty: property ' + quoted(Name) + ' must not be set'
    )
  }

/**** throwWriteOnlyError ****/

  export function throwWriteOnlyError (Name:WAT_Name):never {
    throwError(
      'WriteOnlyProperty: property ' + quoted(Name) + ' must not be read'
    )
  }

/**** PropertyDescriptorFor ****/

  export function PropertyDescriptorFor (Target:any, Property:any):any {
    if (Target == null) throwError(
      'InvalidArgument: the given target object is null or undefined'
    )

    while (Target != null) {
      let Candidate = Object.getOwnPropertyDescriptor(Target,Property)
      if (Candidate != null) { return Candidate }

      Target = Object.getPrototypeOf(Target)
    }

    return undefined
  }

/**** KeySetOf ****/

  type WAT_KeySet = { [Key:string]:any }

  function KeySetOf (KeyList:string[]):WAT_KeySet {
    let Result = Object.create(null)
      KeyList.forEach(Key => Result[Key] = Key)
    return Result
  }

//----------------------------------------------------------------------------//
//                                DOM Helpers                                 //
//----------------------------------------------------------------------------//

/**** camelized ****/

  function camelized (Original:string):string {
    return Original.replace(/-([a-z])/gi,(Match) => Match[1].toUpperCase())
  }

/**** pruned ****/

  function pruned (Original:string):string {
    return Original.replace(/^\s+/,'').replace(/\s+$/,'').replace(/\s+/g,' ')
  }

/**** forEach ****/

  type IteratorCallback = (Value:any, Index:number, List:any[]) => void

  function forEach (
    ElementList:HTMLCollection|NodeListOf<Element>, Handler:IteratorCallback
  ):void {
    Array.prototype.forEach.call(ElementList,Handler)
  }

/**** filtered ****/

  type FilterCallback = (Value:any, Index:number, List:any[]) => unknown

  function filtered (
    ElementList:HTMLCollection|NodeListOf<Element>, Filter:string | FilterCallback
  ):HTMLElement[] {
    return (
      ValueIsString(Filter)
      ? Array.prototype.filter.call(ElementList,(Candidate:Element) => Candidate.matches(Filter as string))
      : Array.prototype.filter.call(ElementList,Filter as FilterCallback)
    )
  }

/**** closestParent ****/

  function closestParent (DOMElement:HTMLElement, Selector:string):HTMLElement | undefined {
    let outerElement = DOMElement.parentElement
    if (outerElement == null) { return undefined }

    return outerElement.closest(Selector) as HTMLElement
  }

/**** closestFilteredParent ****/

  function closestFilteredParent (
    DOMElement:HTMLElement, Selector:string, Filter:Function
  ):HTMLElement | undefined {
    let outerElement = DOMElement.parentElement
    if (outerElement == null) { return undefined }

    outerElement = outerElement.closest(Selector) as HTMLElement
    while (outerElement != null) {
      if (Filter(outerElement) == true) { return outerElement }
      outerElement = outerElement.closest(Selector) as HTMLElement
    }

    return undefined
  }

/**** attr ****/

  function attr (DOMElement:Element, Name:string, Value?:string):any {
    if (arguments.length === 2) {
      return DOMElement.getAttribute(Name)
    } else {
      if (Value == null) {
        DOMElement.removeAttribute(Name)
      } else {
        DOMElement.setAttribute(Name,Value as string)
      }
    }
  }

/**** css ****/

  function css (DOMElement:HTMLElement, Name:string, Value?:string):any {
    if (arguments.length === 2) {
// @ts-ignore we want to index literally!
      return window.getComputedStyle(DOMElement)[camelized(Name)] as string
    } else {
// @ts-ignore we want to index literally!
      DOMElement.style[camelized(Name)] = Value as string
    }
  }

/**** html ****/

  function html (DOMElement:Element, Value?:string):any {
    if (arguments.length === 1) {
      return DOMElement.innerHTML
    } else {
      DOMElement.innerHTML = Value as string
    }
  }

/**** text ****/

  function text (DOMElement:HTMLElement, Value?:string):any {
    if (arguments.length === 1) {
      return DOMElement.innerText
    } else {
      DOMElement.innerText = Value as string
    }
  }

/**** data ****/

  function data (DOMElement:HTMLElement, Name:string, Value?:string):any {
    if (arguments.length === 2) {
      return DOMElement.dataset[camelized(Name)]
    } else {
      DOMElement.dataset[camelized(Name)] = Value as string
    }
  }

/**** remove ****/

  function remove (ElementOrList:Element|Element[]|HTMLCollection):void {
    switch (true) {
      case ValueIsElement(ElementOrList):
        let outerElement = (ElementOrList as Element).parentElement
        if (outerElement != null) { outerElement.removeChild(ElementOrList as Element) }
        break
      case ValueIsArray(ElementOrList):
        (ElementOrList as Element[]).forEach((Element) => remove(Element))
        break
      default:
        forEach(ElementOrList as HTMLCollection,(Element) => remove(Element))
    }
  }

/**** ElementFromHTML ****/

  function ElementFromHTML (HTML:string):HTMLElement {
    let auxElement = document.createElement('div')
      auxElement.innerHTML = HTML
    return auxElement.firstChild as HTMLElement
  }

//----------------------------------------------------------------------------//
//                             DOM Event Handling                             //
//----------------------------------------------------------------------------//

  const EventHandlerRegistry = new WeakMap()

  function registerEventHandlerIn (
    Element:Document|HTMLElement, EventName:string, Selector:string | undefined,
    Handler:Function, onceOnly:boolean
  ):void {
    let EventNames:string[] =  pruned(EventName).split(' ')

  /**** construct actual event handler ****/

    let actualHandler = function EventHandler (DOMEvent:Event):void {
      try {
        if (
          (Selector != null) &&
          ! (DOMEvent.target as HTMLElement).matches(Selector)
        ) { return }

        let Result:any = Handler(DOMEvent)

        if (Result === false) {
          DOMEvent.stopPropagation()
          DOMEvent.preventDefault()
        }
      } catch (Signal) {
        console.error('event handler failed with',Signal)
      }

      if (onceOnly) {
        off(DOMEvent.currentTarget as HTMLElement, DOMEvent.type, Selector, Handler)
      }
    }

  /**** register and attach event handlers ****/

    let HandlerList:any[] = EventHandlerRegistry.get(Element)
    if (HandlerList == null) {
      EventHandlerRegistry.set(Element,HandlerList = [])
    }

    EventNames.forEach((EventName:string) => {
      HandlerList.push({ EventName, Selector, actualHandler, Handler })
      Element.addEventListener(EventName,actualHandler,false)
    })
  }

/**** on ****/

  function on (
    Element:Document|HTMLElement, EventName:string, Selector:string | undefined,
    Handler:Function
  ):void {
    registerEventHandlerIn(Element,EventName,Selector,Handler,false)
  }

/**** one ****/

  function one (
    Element:Document|HTMLElement, EventName:string, Selector:string | undefined,
    Handler:Function
  ):void {
    registerEventHandlerIn(Element,EventName,Selector,Handler,true)
  }

/**** off ****/

  function off (
    Element:Document|HTMLElement, EventName?:string, Selector?:string | undefined,
    Handler?:Function
  ):void {
    let EventNames:string[] | undefined = undefined
    if (EventName != null) { EventNames = pruned(EventName).split(' ') }

  /**** unregister and detach event handlers ****/

    let HandlerList:any[] = EventHandlerRegistry.get(Element)
    if (HandlerList == null) { return }

    for (let i = HandlerList.length; i >= 0; i--) {
      let HandlerEntry = HandlerList[i]
      if (
        ((EventNames == null) || (EventNames.indexOf(HandlerEntry.EventName) >= 0)) &&
        ((Selector   == null) || (HandlerEntry.Selector === Selector)) &&
        ((Handler    == null) || (HandlerEntry.Handler  === Handler))
      ) {
        Element.removeEventListener(HandlerEntry.EventName,HandlerEntry.actualHandler)
        HandlerList.splice(i,1)
      }
    }
  }

/**** trigger ****/

  function trigger (
    DOMElement:Document|HTMLElement, EventOrName:Event|string, extraParameters?:any
  ):void {
    if ((Designer != null) && (DOMElement !== document)) {
      let Peer = (DOMElement as HTMLElement).closest('.WAT') as HTMLElement
      if (Peer != null) {
        let Visual = VisualOfElement(Peer)
        if (Visual != null) {
          if (Designer.inhibitsEventsFrom(Visual)) { return }
        }
      }
    }

    if (ValueIsString(EventOrName)) {
      DOMElement.dispatchEvent(new CustomEvent(
        EventOrName as string,
        { detail:extraParameters, bubbles:true, cancelable:true }
      ))
    } else {                                         // ValueIsInstanceOf(Event)
      DOMElement.dispatchEvent(EventOrName as Event)
    }
  }

//----------------------------------------------------------------------------//
//                                HTML Parsing                                //
//----------------------------------------------------------------------------//

  type HTMLAttribute = {
    Name:string,
    Value:string,
    escapedValue:string
  }

  type HTMLParserCallbackSet = {
    processStartTag ?: (TagName:string, Attributes:HTMLAttribute[], isUnary:boolean, isTopLevel:boolean) => any,
    processEndTag   ?: (TagName:string, isTopLevel:boolean) => any,
    processText     ?:    (Text:string, isTopLevel:boolean) => any,
    processComment  ?: (Comment:string) => any
  }

  type TagStack = string[] & { last:() => string|undefined }

  function parseHTML (HTML:string, Callbacks:HTMLParserCallbackSet):void {
    const StartTagPattern  = /^<([-a-z0-9_]+)((?:[\s\xA0]+[-a-z0-9_]+(?:[\s\xA0]*=[\s\xA0]*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s\xA0]+))?)*)[\s\xA0]*(\/?)>/i
    const EndTagPattern    = /^<\/([-a-z0-9_]+)[^>]*>/i
    const AttributePattern = /([-a-z0-9]+)(?:[\s\xA0]*=[\s\xA0]*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s\xA0]+)))?/gi

  /**** MapOf makes a "map" with keys from a given comma-separated key list ****/

    function MapOf (Elements:string):{ [Key:string]:boolean } {
      let ElementList = Elements.split(',')
      let Result = Object.create(null)
        for (let i = 0, l = ElementList.length; i < l; i++) {
          Result[ElementList[i]] = true
        }
      return Result
    }

  /**** maps with the names of tags and attributes with a specific characteristic ****/

    const isEmptyElement = MapOf(
      'area,base,basefont,br,col,embed,frame,hr,img,input,isIndex,keygen,link,' +
      'meta,param,source,track,wbr'
    )

    const isBlockElement = MapOf(
      'address,article,aside,audio,blockquote,canvas,center,dd,dir,div,dl,dt,' +
      'fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,' +
      'hgroup,hr,ins,isIndex,li,main,menu,nav,noframes,noscript,ol,output,p,pre,' +
      'section,table,tbody,td,tfoot,th,thead,tr,ul,video' +
      ',applet' // added for WAT
    )

    const isInlineElement = MapOf(
      'a,abbr,acronym,Applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,' +
      'font,i,iframe,img,input,ins,kbd,label,map,Object,q,s,samp,Script,select,' +
      'small,span,strike,strong,sub,sup,textarea,tt,u,var'
    )

    const isSelfClosingElement = MapOf(
      'area,base,basefont,bgsound,br,col,colgroup,dd,dt,embed,frame,hr,img,' +
      'input,isIndex,keygen,li,link,menuitem,meta,options,p,param,source,td,' +
      'tfoot,th,thead,tr,track,wbr'
    )

    const isSpecialElement = MapOf(
      'script,style,svelte:options'
    )

    const isKeywordAttribute = MapOf(
      'checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,' +
      'noshade,nowrap,readonly,selected'
    )

  /**** actual HTML parser ****/

    let doNothing = function ():void {}

    let processStartTag = Callbacks.processStartTag || doNothing
    let processEndTag   = Callbacks.processEndTag   || doNothing
    let processText     = Callbacks.processText     || doNothing
    let processComment  = Callbacks.processComment  || doNothing

// @ts-ignore "Stack.last" will be defined just one line later
    let Stack:TagStack = []    // Stack with tag names of unclosed HTML elements
      Stack.last = function last ():string|undefined { return this[this.length-1] }

    function parseStartTag (
      _:any, TagName:string, rest:string, isUnary?:boolean
    ):string {
      TagName = TagName.toLowerCase()

      if (isBlockElement[TagName]) {            // close pending inline elements
        while ((Stack.last() != null) && isInlineElement[Stack.last() as string]) {
          parseEndTag('', Stack.last())
        }
      }

      if (isSelfClosingElement[TagName] && (Stack.last() === TagName)) {
        parseEndTag('', TagName)
      }

      isUnary = isEmptyElement[TagName] || !!isUnary
      if (! isUnary) { Stack.push(TagName) }

      if (processStartTag !== doNothing) {
        let Attributes:any[] = []
          rest.replace(AttributePattern, function(Match:any, AttributeName:string):string {
            let AttributeValue:string = (arguments[2] ? arguments[2] :
              arguments[3] ? arguments[3] :
                arguments[4] ? arguments[4] :
                  isKeywordAttribute[AttributeName] ? AttributeName : '')
            Attributes.push({
              Name:AttributeName, Value:AttributeValue,
              escapedValue:AttributeValue.replace(/(^|[^\\])"/g, '$1\\\"')
            })
            return ''
          })
        processStartTag(
          TagName, Attributes, isUnary, (Stack.length === (isUnary ? 0 : 1))
        )
      }

      return ''
    }

    function parseEndTag (_?:any, TagName?:string):string {
      let Position;                 // how many open elements have to be closed?
      if (TagName == null) {
        Position = 0
      } else {
        TagName = TagName.toLowerCase()

        for (Position = Stack.length-1; Position >= 0; Position--) {
          if (Stack[Position] === TagName) { break }
        }
      }

      if (Position >= 0) {
        for (let i = Stack.length-1; i >= Position; i--) {
          processEndTag(Stack[i], (i === 0))
        }
        Stack.length = Position
      }

      return ''
    }

    let lastHTMLContent = HTML
    while (HTML !== '') {
      let inText = true

      if ((Stack.last() == null) || ! isSpecialElement[Stack.last() as string]) {
        if (HTML.startsWith('<!--')) {                           // HTML comment
          let Index = HTML.indexOf('-->',4)
          if (Index > 0) {
            processComment(HTML.slice(4,Index))
            HTML    = HTML.slice(Index + 3)
            inText = false
          }
        } else if (HTML.startsWith('</')) {                      // HTML end tag
          let Match = HTML.match(EndTagPattern)
          if (Match != null) {
            HTML = HTML.slice(Match[0].length)
            Match[0].replace(EndTagPattern, parseEndTag);// for side effects
            inText = false
          }
        } else if (HTML.startsWith('<')) {                     // HTML start tag
          let Match = HTML.match(StartTagPattern)
          if (Match != null) {
            HTML = HTML.slice(Match[0].length)
            Match[0].replace(StartTagPattern, parseStartTag);// for side effects
            inText = false
          }
        }

        if (inText) {
          let Index = HTML.indexOf('<')

          let Text = (Index < 0 ? HTML : HTML.slice(0,Index))
          HTML     = (Index < 0 ? ''   : HTML.slice(Index))

          processText(Text, Stack.length === 0)
        }
      } else {
        HTML = HTML.replace(
          new RegExp('^((?:.|\n)*?)<\/' + Stack.last() + '[^>]*>','i'),
          function (_:any, Text:string):string {
            Text = Text
              .replace(/<!--(.*?)-->/g, '$1')
              .replace(/<!\[CDATA\[(.*?)]]>/g, '$1')
            processText(Text, Stack.length === 0)
            return ''
          }
        )
        parseEndTag('', Stack.last())
      }

      if (HTML === lastHTMLContent) {
        switch (true) {
          case HTML.startsWith('<'):
            HTML = HTML.slice(1)
            processText('&lt;', Stack.length === 0)
            break
          default:
            throwError('HTMLParseError: could not parse "' + HTML + '"')
        }
      }
      lastHTMLContent = HTML
    }
    parseEndTag()
  }

/**** AttributeFrom ****/

  function AttributeFrom (AttributeName:string, Attributes:any[]):string|undefined {
    for (let i = 0, l = Attributes.length; i < l; i++) {
      let Attribute = Attributes[i]
      if (Attribute.Name === AttributeName) { return Attribute.Value }
    }
    return undefined
  }

/**** deserializedTag ****/

  function deserializedTag (
    TagName:string, Attributes:HTMLAttribute[], isUnary:boolean
  ):string {
    let Result = '<' + TagName
      for (let i = 0, l = Attributes.length; i < l; i++) {
        let Attribute = Attributes[i]
        Result += ' ' + Attribute.Name + '="' + Attribute.escapedValue + '"'
      }
    return Result + (isUnary ? '/>' : '>')
  }

/**** escapedHTMLAttribute ****/

  function escapedHTMLAttribute (OriginalValue:string):string {
    return OriginalValue.replace(
      /[&<>"'\u0000-\u001F\u007F-\u009F\\]/g, function (Match) {
        switch (Match) {
          case '&':  return '&amp;'
          case '<':  return '&lt;'
          case '>':  return '&gt;'
          case '"':  return '&quot;'
          case "'":  return '&apos;'
          case '\n': return '\n'            // allows line feeds to be preserved
          case '\\': return '&#92;'
          default:   let Result = Match.charCodeAt(0).toString(16)
                     return '&#x0000'.substring(3,7-Result.length) + Result + ';'
        }
      }
    )
  }

/**** unescapedHTMLAttribute ****/

  function unescapedHTMLAttribute (OriginalValue:string):string {
    return OriginalValue.replace(
      /&(amp|lt|gt|quot|apos|#92|#x[0-9a-fA-F]{4});/g, function (Match) {
        switch (Match) {
          case '&amp;':  return '&'
          case '&lt;':   return '<'
          case '&gt;':   return '>'
          case '&quot;': return '"'
          case '&apos;': return "'"
          case '&#92;':  return '\\'
          default:
            let Code = parseInt(Match.slice(3),16)
            return String.fromCharCode(Code)
        }
      }
    )
  }

//----------------------------------------------------------------------------//
//                              Version Handling                              //
//----------------------------------------------------------------------------//

/**** parsedVersion - parses "SemVer" into "Version" ****/

  const VersionPattern = /^(\d+)(?:[.](\d+)(?:[.](\d+)(-[-0-9A-Za-z.]+)?)?)?$/
// pattern is not perfect, see https://semver.org/

  function parsedVersion (              // for syntactically valid SemVers only!
    Version:WAT_SemVer
  ):WAT_Version {
    let MatchList = VersionPattern.exec(Version) as string[]
      let major = parseInt(MatchList[1],10)
      let minor = (MatchList[2] == null ? undefined : parseInt(MatchList[2],10))
      let Patch = (MatchList[3] == null ? undefined : parseInt(MatchList[3],10))
      let Build = (MatchList[4] == null ? undefined : parseInt(MatchList[4].slice(1),16))

    return { major, minor, Patch, Build }
  }

/**** normalized ****/

  function normalized (Version:WAT_Version):WAT_normalizedVersion {
    let { major, minor, Patch, Build } = Version
      minor = minor || 0
      Patch = Patch || ((major === 0) && (minor === 0) ? 1 : 0)
      Build = 1
    return { major, minor, Patch, Build }
  }

/**** serializedVersion ****/

  function serializedVersion (Version:WAT_Version):WAT_SemVer {
    return (
      Version.major + '.' + (Version.minor || '0') + '.' + (Version.Patch || '0') + (
        Version.Build == null ? '' : '.' + Version.Build.toString(16)
      )
    )
  }

/**** VersionAeqB ****/

  function VersionAeqB (
    VersionA:WAT_normalizedVersion, VersionB:WAT_normalizedVersion
  ):boolean {
    return (
      (VersionA.major === VersionB.major) &&
      (VersionA.minor === VersionB.minor) &&
      (VersionA.Patch === VersionB.Patch) &&
      (VersionA.Build === VersionB.Build)
    )
  }

/**** VersionAgtB ****/

  function VersionAgtB (
    VersionA:WAT_normalizedVersion, VersionB:WAT_normalizedVersion
  ):boolean {
    return (
      (VersionA.major  >  VersionB.major) ||
      (VersionA.major === VersionB.major) && (
        (VersionA.minor  >  VersionB.minor) ||
        (VersionA.minor === VersionB.minor) && (
          (VersionA.Patch  >  VersionB.Patch) ||
          (VersionA.Patch === VersionB.Patch) &&
            (VersionA.Build  >  VersionB.Build)
        )
      )
    )
  }

/**** VersionAmatchesB - A was requested and B is already loaded ****/

  function VersionAmatchesB (
    VersionA:WAT_Version, VersionB:WAT_normalizedVersion
  ):boolean {
    if (VersionA.major == null)              { return true }
    if (VersionA.major !== VersionB.major)   { return false }    // inkompatible

    if (VersionA.minor == null)              { return true }
    if (VersionB.major === 0) {
      if (VersionA.minor !== VersionB.minor) { return false }    // inkompatible
    } else {
      if (VersionA.minor  >  VersionB.minor) { return false }   // missing feat.
    }

    return (VersionA.Patch == null) || (VersionA.Patch <= VersionB.Patch)
  }

/**** RelationshipAreplacingB ****/

  const WAT_VersionRelationships = [
    'compatibleDowngrade','incompatibleDowngrade',
    'sameVersion',
    'compatibleUpgrade','incompatibleUpgrade'
  ]
  type WAT_VersionRelationship = typeof WAT_VersionRelationships[number]

  function RelationshipAreplacingB (
    VersionA:WAT_normalizedVersion, VersionB:WAT_normalizedVersion
  ):WAT_VersionRelationship {
    switch (true) {
      case VersionAeqB(VersionA,VersionB):    return 'sameVersion'
      case (VersionA.major < VersionB.major): return 'incompatibleDowngrade'
      case (VersionA.major > VersionB.major): return 'incompatibleUpgrade'
      case (VersionA.major === 0) && (VersionA.minor < VersionB.minor): return 'incompatibleDowngrade'
      case (VersionA.major === 0) && (VersionA.minor > VersionB.minor): return 'incompatibleUpgrade'
      case (VersionA.major === 0) && (VersionA.Patch < VersionB.Patch): return 'incompatibleDowngrade'
      case (VersionA.major === 0) && (VersionA.Patch > VersionB.Patch): return 'compatibleUpgrade'
      case (VersionA.major === 0) && (VersionA.Build < VersionB.Build): return 'compatibleDowngrade'
      case (VersionA.major === 0) && (VersionA.Build > VersionB.Build): return 'compatibleUpgrade'
      case (VersionA.minor < VersionB.minor): return 'incompatibleDowngrade'
      case (VersionA.minor > VersionB.minor): return 'compatibleUpgrade'
      case (VersionA.Patch < VersionB.Patch): return 'compatibleDowngrade'
      case (VersionA.Patch > VersionB.Patch): return 'compatibleUpgrade'
      case (VersionA.Build < VersionB.Build): return 'compatibleDowngrade'
      case (VersionA.Build > VersionB.Build): return 'compatibleUpgrade'
      default: throwError('InternalError: unforeseen version relationship')
    }
  }

/**** currentTimestamp ****/

  const initialTimestamp = new Date('2020-02-02').getTime()

  function currentTimestamp ():number {
    return Date.now()-initialTimestamp
  }

//----------------------------------------------------------------------------//
//                            Resource Management                             //
//----------------------------------------------------------------------------//

  type HTMLAttributeSet = { [normalizedName:string]:HTMLAttribute }

  const WAT_ResourceForms = ['literalStyle','externalStyle','literalScript','externalScript']
  type  WAT_ResourceForm  = typeof WAT_ResourceForms[number]

  type WAT_ResourceInfo = {            // used when parsing a plain resource set
    Form:WAT_ResourceForm,
    Type:string, Media?:string, Title?:string, noModule?:boolean,
    Value:string|WAT_URL|undefined, AttributeSet?:HTMLAttributeSet
  }

  const UsageCountOfResource = new WeakMap()

/**** ResourcesInDocument ****/

  function ResourcesInDocument ():string {
    let ResourceInfoList:WAT_ResourceInfo[] = []

    function includeResource (ResourceInfo:WAT_ResourceInfo):void {
      for (let i = 0, l = ResourceInfoList.length; i < l; i++) {
        if (ResourceInfosAreMatching(ResourceInfoList[i],ResourceInfo)) {
          ResourceInfoList[i] = ResourceInfo
          return
        }
      }
      ResourceInfoList.push(ResourceInfo)
    }

    filtered(document.head.children,'link,style,script').forEach((DOMElement) => {
      let Type, Media, Title, noModule, Value
      switch (DOMElement.tagName) {
        case 'LINK':
          Type  = attr(DOMElement,'type')  || 'text/css'
          Media = attr(DOMElement,'media') || 'all'
          Title = attr(DOMElement,'title') || undefined
          Value = attr(DOMElement,'href')
          if ((Type === 'text/css') && (Value != null)) {
            includeResource({ Form:'externalStyle', Type, Media, Title, Value })
          }
          break
        case 'STYLE':
          Type  = attr(DOMElement,'type')  || 'text/css'
          Media = attr(DOMElement,'media') || 'all'
          Title = attr(DOMElement,'title') || undefined
          Value = html(DOMElement)
          if ((Type === 'text/css') && (Value.trim() !== '')) {
            includeResource({ Form:'literalStyle', Type, Media, Title, Value })
          }
          break
        case 'SCRIPT':
          Type     = attr(DOMElement,'type') || 'application/javascript'
            if (Type === 'text/javascript') { Type = 'application/javascript' }
          noModule = (attr(DOMElement,'nomodule') != null)
          Value    = attr(DOMElement,'src') || html(DOMElement)

          if ((Type === 'application/javascript') && (Value.trim() !== '')) {
            if (attr(DOMElement,'src') == null) {
              includeResource({ Form:'literalScript',  Type, noModule, Value })
            } else {
              includeResource({ Form:'externalScript', Type, noModule, Value })
            }
          }
      }
    })

    return ResourceInfoList.join('\n')
  }

/**** registerResources ****/

  export function registerResources (Resources:string):void {
    expectText('resource',Resources)
    processResources(Resources || '','register')
  }

/**** unregisterResources ****/

  export function unregisterResources (Resources:string | undefined):void {
    allowText('resource',Resources)
    if (Resources != null) {
      processResources(Resources || '','unregister')
    }
  }

/**** collectResources ****/

  function collectResources (Resources:string):void {
    processResources(Resources || '','collect')
  }

/**** processResources ****/

  type WAT_ResourceProcessingMode = 'register' | 'unregister' | 'collect'

  function processResources (
    Resources:string, Mode:WAT_ResourceProcessingMode
  ):void {
    if (Resources.trim() === '') { return }

    let ResourceInfoList = parsedResources(Resources)  // also avoids duplicates
    ResourceInfoList.forEach(
      (ResourceInfo) => { processResource(ResourceInfo,Mode) }
    )
  }

/**** processResource - for registration, deregistration and collection ****/

  function processResource (
    ResourceInfo:WAT_ResourceInfo, Mode:WAT_ResourceProcessingMode
  ):void {
    let matchingResource = ElementMatchingResourceInfo(ResourceInfo)
    if (matchingResource == null) {
      switch (Mode) {
        case 'register':   break              // installation will be done below
        case 'unregister': return                        // already unregistered
        case 'collect':    throwError('NoSuchResource: an expected resource has already been removed')
      }
    } else {
      switch (Mode) {
        case 'register':   reuseResource(matchingResource);   return
        case 'unregister': unuseResource(matchingResource);   return
        case 'collect':    collectResource(matchingResource); return
      }
    }

  /**** now install the requested resource ****/

    let Resource
    switch (ResourceInfo.Form) {
      case 'literalStyle':
        Resource = ElementFromHTML('<style></style>')
        html(Resource,ResourceInfo.Value || '')
        break
      case 'externalStyle':
        Resource = ElementFromHTML('<link></link>')
        break
      case 'literalScript':
        Resource = ElementFromHTML('<' + 'script><' + '/script>')
        html(Resource,ResourceInfo.Value || '')
        break
      case 'externalScript':
        Resource = ElementFromHTML('<' + 'script><' + '/script>')
        break
      default: throwError('InternalError: unforeseen resource form')
    }
      let AttributeSet = ResourceInfo.AttributeSet || {}
      for (let AttributeName in AttributeSet) {
        if (AttributeSet.hasOwnProperty(AttributeName)) {
          attr(Resource,AttributeName,AttributeSet[AttributeName].Value)
        }
      }
    switch (ResourceInfo.Form) {
      case 'literalStyle':
      case 'externalStyle':
        document.head.appendChild(Resource)
        break
      case 'literalScript':
        try {
          document.head.appendChild(Resource)
        } catch (Signal) {
          console.warn('could not attach literal script', Signal)
          throw Signal
        }
        break
      case 'externalScript':
        document.head.appendChild(Resource)
        break
      default: throwError('InternalError: unforeseen resource form')
    }

    UsageCountOfResource.set(Resource,1)
  }

/**** parsedResources - parses resources string into ResourceInfo list ****/

  function parsedResources (Resources:string):WAT_ResourceInfo[] {
    let ResourceInfoList:WAT_ResourceInfo[] = []
      function AttributeSetFrom (AttributeList:HTMLAttribute[]):HTMLAttributeSet {
        let Result:HTMLAttributeSet = {}
          for (let i = 0, l = AttributeList.length; i < l; i++) {
            Result[ (AttributeList[i].Name as string).toLowerCase() ] = AttributeList[i]
          }
        return Result
      }

      function processResource (newResourceInfo:WAT_ResourceInfo):void {
        ResourceInfoList.forEach((ResourceInfo) => {
          if (ResourceInfosAreMatching(ResourceInfo,newResourceInfo)) {
            throwError(
              'DuplicateResources: the given set of resources contains duplicates'
            )
          } else {
            ResourceInfoList.push(newResourceInfo)
          }
        })
      }

      let ResourceAttributes:HTMLAttributeSet, ResourceContent:string|undefined
      let HTMLParserCallbacks = {
        processStartTag: function processStartTag (
          TagName:string, Attributes:HTMLAttribute[], isUnary:boolean, isTopLevel:boolean
        ) {
          if (isTopLevel) {
            switch (TagName) {
              case 'link':
                if (AttributeFrom('rel',Attributes) === 'stylesheet') {
                  processResource({
                    Form: 'externalStyle',
                    Type: AttributeFrom ('type',Attributes) || 'text/css',
                    Media:AttributeFrom('media',Attributes) || 'all',
                    Title:AttributeFrom('title',Attributes) || undefined,
                    Value:AttributeFrom('href',Attributes),
                    AttributeSet:AttributeSetFrom(Attributes)
                  })
                }
                return
              case 'script':
              case 'style':
                ResourceAttributes = AttributeSetFrom(Attributes)
                ResourceContent    = ''
                return
              default:
                throwError(
                  'InvalidResourceSet: a WAT resource set must only contain ' +
                  'style, script or link elements (the latter only with ' +
                  'relation "stylesheet")'
                )
            }
          } else {
            if (ResourceContent !== undefined) {
              ResourceContent += deserializedTag(TagName,Attributes,isUnary)
            }
          }
        },
        processEndTag: function processEndTag (TagName:string, isTopLevel:boolean) {
          if (isTopLevel) {
            switch (TagName) {
              case 'script':
                processResource({
                  Form:    (ResourceAttributes.src == null ? 'literalScript' : 'externalScript'),
                  Type:    ResourceAttributes?.type.Value || 'application/javascript',
                  noModule:('nomodule' in ResourceAttributes),
                  Value:   (
                    ResourceAttributes.src == null
                    ? ResourceContent
                    : ResourceAttributes.src.Value
                  ),
                  AttributeSet:ResourceAttributes
                })
                break
              case 'style':
                processResource({
                  Form: 'literalStyle',
                  Type: ResourceAttributes?.type.Value  || 'text/css',
                  Media:ResourceAttributes?.media.Value || 'all',
                  Title:ResourceAttributes?.title.Value || undefined,
                  Value:ResourceContent,
                  AttributeSet:ResourceAttributes
                })
            }
            ResourceAttributes = {}; ResourceContent = undefined
          } else {
            if (ResourceContent !== undefined) {
              ResourceContent += '</' + TagName + '>'
            }
          }
        },
        processText: function processText (Text:string, isTopLevel:boolean) {
          if (ResourceContent !== undefined) {
            ResourceContent += Text
          }
        },
      }

      parseHTML(Resources, HTMLParserCallbacks)
    return ResourceInfoList
  }

/**** reuseResource ****/

  function reuseResource (Resource:Element):void {
    UsageCountOfResource.set(
      Resource, (UsageCountOfResource.get(Resource) || 0) + 1
    )
  }

/**** unuseResource ****/

  function unuseResource (Resource:Element):void {
    UsageCountOfResource.set(
      Resource, Math.max(0, (UsageCountOfResource.get(Resource) || 0) - 1)
    )
  }

  let ResourceCollection:Element[]

/**** clearResourceCollection - to be called prior to a resource collection ****/

  function clearResourceCollection ():void {
    ResourceCollection = []
  }

/**** collectResource ****/

  function collectResource (Resource:Element):void {
    for (let i = 0, l = ResourceCollection.length; i < l; i++) {
      if (ResourceCollection[i] === Resource) { return }
    }
    ResourceCollection.push(Resource)
  }

/**** collectedResources ****/

  function collectedResources ():string {
    let Result = ''
      for (let i = 0, l = ResourceCollection.length; i < l; i++) {
        Result += ResourceCollection[i].outerHTML + '\n'
      }
    return Result
  }

/**** ResourceInfosAreMatching ****/

  function ResourceInfosAreMatching (
    Info_A:WAT_ResourceInfo, Info_B:WAT_ResourceInfo
  ):boolean {
    if (Info_A.Form !== Info_B.Form) { return false }

    switch (Info_A.Form) {
      case 'literalStyle':
      case 'externalStyle': return (
        (Info_A.Type  === Info_B.Type)  &&
        (Info_A.Media === Info_B.Media) &&
        (Info_A.Title === Info_B.Title) &&
        ((Info_A.Value || '').trim() === (Info_B.Value || '').trim())
      )
      case 'literalScript':
      case 'externalScript': return (
        (Info_A.Type     === Info_B.Type)     &&
        (Info_A.noModule === Info_B.noModule) &&
        ((Info_A.Value || '').trim() === (Info_B.Value || '').trim())
      )
      default: throwError('InternalError: unforeseen resource form')
    }
  }

/**** ResourceInfoMatchesElement ****/

  function ResourceInfoMatchesElement (
    ResourceInfo:WAT_ResourceInfo, DOMElement:Element
  ):boolean {
    switch (ResourceInfo.Form) {
      case 'literalStyle': return (
        (DOMElement.tagName === 'STYLE') &&
        ((attr(DOMElement,'type')  || 'text/css') === 'text/css')  &&
        ((attr(DOMElement,'media') || 'all')      === ResourceInfo.Media) &&
        ((attr(DOMElement,'title') || undefined)  === ResourceInfo.Title) &&
        ((DOMElement.textContent || '').trim() === ResourceInfo.Value)
      )
      case 'externalStyle': return (
        (DOMElement.tagName === 'LINK') && (attr(DOMElement,'rel') === 'stylesheet') &&
        ((attr(DOMElement,'type')  || 'text/css') === 'text/css')  &&
        ((attr(DOMElement,'media') || 'all')      === ResourceInfo.Media) &&
        ((attr(DOMElement,'title') || undefined)  === ResourceInfo.Title) &&
        (attr(DOMElement,'href') === ResourceInfo.Value)  // TODO: normalize URL
      )
      case 'literalScript': return (
        (DOMElement.tagName === 'SCRIPT') && (
          (attr(DOMElement,'type') == null) ||
          (attr(DOMElement,'type') === 'application/javascript') ||
          (attr(DOMElement,'type') === 'text/javascript')
        ) &&
        ((attr(DOMElement,'nomodule') || false) === ResourceInfo.noModule) &&
        ((DOMElement.textContent || '').trim() === ResourceInfo.Value)
      )
      case 'externalScript': return (
        (DOMElement.tagName === 'SCRIPT') && (
          (attr(DOMElement,'type') == null) ||
          (attr(DOMElement,'type') === 'application/javascript') ||
          (attr(DOMElement,'type') === 'text/javascript')
        ) &&
        ((attr(DOMElement,'nomodule') || false) === ResourceInfo.noModule) &&
        (attr(DOMElement,'src') === ResourceInfo.Value)   // TODO: normalize URL
      )
      default: throwError('InternalError: unforeseen resource form')
    }
  }

/**** ElementMatchingResourceInfo ****/

  function ElementMatchingResourceInfo (
    ResourceInfo:WAT_ResourceInfo
  ):Element | undefined {
    let matchingElement:Element|undefined = undefined
      filtered(document.head.children,'link,style,script').forEach((DOMElement) => {
        if (ResourceInfoMatchesElement(ResourceInfo,DOMElement)) {
          matchingElement = DOMElement
        }
      })
    return matchingElement
  }

//----------------------------------------------------------------------------//
//                              Backup Handling                               //
//----------------------------------------------------------------------------//

  let BackupIsSupported = false

  ready(() => {
    try {
      localforage.config({
        driver: [localforage.INDEXEDDB, localforage.WEBSQL]
      })
      BackupIsSupported = true
    } catch (Signal) { /* nop */ }
  })

  let AppletStore:any                          // will be filled during start-up

/**** AppletsMayBePreserved ****/

  export function AppletsMayBePreserved ():boolean {
    return (AppletStore != null)
  }

/**** AppletMayBePreserved ****/

  export function AppletMayBePreserved (Applet:WAT_Applet):boolean {
    expectApplet('applet',Applet)

    return (
      AppletsMayBePreserved() &&
      ValueIsName(Applet.Name) &&
      (InternalsOfVisual(Applet) != null) &&
      (InternalsOfVisual(Applet).BackupStatus == null)
    )
  }

/**** AppletHasBackup ****/

  export async function AppletHasBackup (
    AppletOrPeer:WAT_Applet|HTMLElement
  ):Promise<boolean> {
    let AppletName
      switch (true) {
        case ValueIsApplet(AppletOrPeer):
          AppletName = (AppletOrPeer as WAT_Applet).Name
          if (AppletName == null) { return false }
          break
        case ValueIsElement(AppletOrPeer):
          let Candidate = data(AppletOrPeer as HTMLElement,'wat-name')
          if (ValueIsName(Candidate)) { AppletName = Candidate } else { return false }
          break
        default: throwError(
          'InvalidArgument: applet or applet name expected'
        )
      }
    if (! AppletsMayBePreserved()) { return false }

    try {
      let normalizedAppletName = (
        AppletName.startsWith('#') ? AppletName.slice(1) : AppletName
      )

      return ValueIsString(await AppletStore.getItem(normalizedAppletName))
    } catch (Signal) {
      console.error(
        'backup of applet "' + AppletName + ' could not be checked, reason: ', Signal
      )
      return false
    }
  }

/**** AppletRestoredIntoPeer (during startup: applet does not yet exist) ****/

  async function AppletRestoredIntoPeer (
    Peer:HTMLElement
  ):Promise<WAT_Applet> {
    expectElement('applet peer',Peer)

    let AppletName = data(Peer,'wat-name')
    if (! ValueIsName(AppletName)) throwError(
      'InvalidArgument: the given applet peer does not have a valid name'
    )

    let Serialization
      try {
        let normalizedAppletName = (
          AppletName.startsWith('#') ? AppletName.slice(1) : AppletName
        )
        Serialization = await AppletStore.getItem(normalizedAppletName)
      } catch (Signal) {
        console.error(
          'applet "' + AppletName + ' could not be restored, reason: ', Signal
        )
        throwError('applet could not be restored (see browser console)')
      }
    deserializeAppletIntoPeer(Serialization, Peer, {
      compatibleDowngrade:  'perform',
      incompatibleDowngrade:'perform',
      sameVersion:          'perform',
      compatibleUpgrade:    'perform',
      incompatibleUpgrade:  'perform'
    })

    return VisualOfElement(Peer) as WAT_Applet
  }

/**** preserveApplet ****/

  export async function preserveApplet (Applet:WAT_Applet):Promise<void> {
    expectApplet('applet',Applet)

    validateBackupAccessForApplet(Applet)

    let AppletInternals = InternalsOfVisual(Applet)
    try {
      let normalizedAppletName = (
        Applet.Name.startsWith('#') ? Applet.Name.slice(1) : Applet.Name
      )

      AppletInternals.BackupStatus = 'isBeingPreserved'
        let Serialization = serializedVisuals(
          [Applet],undefined,'withPendingSettings','withAllMasters'
        )
        await AppletStore.setItem(normalizedAppletName,Serialization)
      delete AppletInternals.BackupStatus
    } catch (Signal) {
      delete AppletInternals.BackupStatus
      console.error(
        'applet "' + Applet.Name + ' could not be preserved, reason: ', Signal
      )
      throwError('applet could not be preserved (see browser console)')
    }
  }

/**** restoreApplet (while applet is running) ****/

  export async function restoreApplet (
    Applet:WAT_Applet, CollisionHandling:WAT_CollisionHandling
  ):Promise<void> {
    expectApplet('applet',Applet)

    let AppletName = Applet.Name
    validateBackupAccessForApplet(Applet)

    let Serialization
      let AppletInternals = InternalsOfVisual(Applet)
      try {
        let normalizedAppletName = (
          AppletName.startsWith('#') ? AppletName.slice(1) : AppletName
        )

        AppletInternals.BackupStatus = 'isBeingRestored'
          Serialization = await AppletStore.getItem(normalizedAppletName)
        delete AppletInternals.BackupStatus
      } catch (Signal) {
        delete AppletInternals.BackupStatus
        console.error(
          'applet "' + AppletName + ' could not be restored, reason: ', Signal
        )
        throwError('applet could not be restored (see browser console)')
      }
    deserializeAppletIntoPeer(Serialization, Applet.Peer, CollisionHandling)
  }

/**** removeBackupOfApplet ****/

  export async function removeBackupOfApplet (Applet:WAT_Applet):Promise<void> {
    expectApplet('applet',Applet)

    validateBackupAccessForApplet(Applet)

    let AppletInternals = InternalsOfVisual(Applet)
    try {
      let normalizedAppletName = (
        Applet.Name.startsWith('#') ? Applet.Name.slice(1) : Applet.Name
      )

      AppletInternals.BackupStatus = 'isBeingRemoved'
        await AppletStore.removeItem(normalizedAppletName)
      delete AppletInternals.BackupStatus
    } catch (Signal) {
      delete AppletInternals.BackupStatus
      console.error(
        'applet "' + Applet.Name + ' could not be removed, reason: ', Signal
      )
      throwError('applet could not be removed (see browser console)')
    }
  }

/**** validateBackupAccessForApplet ****/

  function validateBackupAccessForApplet (Applet:WAT_Applet):void {
    if (! AppletsMayBePreserved()) throwError(
      'NotSupported: WAT applets can not be preserved in this environment'
    )

    let AppletName = Applet.Name
    if (! ValueIsName(AppletName)) throwError(
      'InvalidArgument: the given applet does not have a valid name'
    )

    switch (InternalsOfVisual(Applet).BackupStatus) {
      case 'isBeingPreserved': throwError(
        'ForbiddenOperation: this applet is currently being backed-up'
      )
      case 'isBeingRestored': throwError(
        'ForbiddenOperation: this applet is currently being restored from its backup'
      )
      case 'isBeingRemoved': throwError(
        'ForbiddenOperation: the backup of this applet is currently being removed'
      )
    }
  }

//----------------------------------------------------------------------------//
//                       Serialization/Deserialization                        //
//----------------------------------------------------------------------------//

/**** serializedResources (w/o duplicates) ****/

  function serializedResources (ResourcesList:string[]):string {
    clearResourceCollection()
      ResourcesList.forEach(
        (Resources) => processResources(Resources,'collect')
      )
    return collectedResources()
  }

/**** serializedMasters - w/o check for duplicates ****/

  function serializedMasters (
    MasterList:WAT_Name[], withPendingSettings?:'withPendingSettings'
  ):string {
    let Serializations:string[] = []
      MasterList.forEach((Master) => {
        if (Master in MasterRegistry) {
          Serializations.push(serializedMaster(Master,withPendingSettings))
        }
      })
    return Serializations.join('\n')
  }

/**** serializedMaster ****/

  export function serializedMaster (
    Master:WAT_Name, withPendingSettings?:'withPendingSettings'
  ):string {
    expectName('master name',Master)

    let MasterInfo = MasterRegistry[Master]
    if (MasterInfo == null) throwError(
      'NoSuchMaster: no master named ' + quoted(Master) + ' found'
    )

    function copyDetails (DetailNames:string):void {
      DetailNames.split(' ').forEach((DetailName) => {
// @ts-ignore we definitely want to index "MasterInfo" using a string
        let Detail = MasterInfo[DetailName] as any
        if (
          (Detail != null) && (
            ValueIsString(Detail) && (Detail !== '') ||
            ValueIsArray(Detail)  && (Detail.length > 0)
          )
        ) { MasterRecord[DetailName] = Detail }
      })
    }

    let MasterRecord:any = {}
      copyDetails(
        'Name Version Category Resources Template Classes Styles Script Properties'
      )

      let undesignableProperties = []
      for (let PropertyName in MasterInfo.undesignablePropertySet) {
        undesignableProperties.push(PropertyName)
      }
      MasterRecord.undesignableProperties = undesignableProperties.join(' ')
    if (withPendingSettings === 'withPendingSettings') {
      copyDetails(
        'pendingResources pendingTemplate pendingClasses pendingStyles pendingScript'
      )
    }

    return (
      '<'+'script type="application/wat-master">\n' +
      JSON.stringify(MasterRecord) +
      '\n<'+'/script>'
    )
  }

/**** serializedVisuals - w/o check for duplicates or inclusions ****/

  function serializedVisuals (
    VisualList:WAT_Visual[],
    withUniqueId?:'withUniqueId',
    withPendingSettings?:'withPendingSettings',
    withMasters?:'withAllMasters'|'withUsedMasters',
    withResources?:'withResources' // assumes non-empty "withMasters"
  ):string {
    let Serialization = ''
      if (withMasters || withResources) {
        if (withMasters == null) { withMasters = 'withUsedMasters' }

        let MasterList:WAT_Name[]
          if (withMasters === 'withUsedMasters') {
            MasterList = MastersUsedByVisuals(VisualList,'withoutIntrinsics')
          } else {
            MasterList = allMastersInDocument()
          }

          if (withResources) {
            let ResourcesList:string[] = []
              MasterList.forEach((Master) => {
                let MasterInfo = MasterRegistry[Master]
                if ((MasterInfo != null) && (MasterInfo.Resources != null)) {
                  ResourcesList.push(MasterInfo.Resources)
                }
              })
            if (ResourcesList.length > 0) {
              Serialization += serializedResources(ResourcesList) + '\n'
            }
          }
        Serialization += serializedMasters(MasterList,withPendingSettings) + '\n'
      }

      VisualList.forEach(
        (Visual) => Serialization += serializedVisual(
          Visual, withUniqueId, withPendingSettings
        )
      )
    return Serialization
  }

/**** serializedVisual ****/

  function serializedVisual (
    Visual:WAT_Visual,
    withUniqueId?:'withUniqueId',
    withPendingSettings?:'withPendingSettings'
  ):string {
    function triggerRecursively (EventName:string):void {
      Visual.trigger(EventName)
      switch (Visual.Category) {
        case 'Applet':
          (Visual as WAT_Applet).CardList.forEach(
            (Card:WAT_Card) => Card.trigger(EventName)
          )
          (Visual as WAT_Applet).OverlayList.forEach(
            (Overlay:WAT_Overlay) => Overlay.trigger(EventName)
          )
          break
        case 'Card':
        case 'Overlay':
        case 'Compound':
          (Visual as WAT_Container).ComponentList.forEach(
            (Component:WAT_Component) => Component.trigger(EventName)
          )
      }
    }

  /**** preserveUniqueIdIn ****/

    function preserveUniqueIdIn (Peer:HTMLElement):void {
      let Visual = VisualForDOMElement.get(Peer)
      attr(Peer,'data-wat-unique-id',InternalsForVisual.get(Visual).uniqueId)

      filtered(Peer.children,'.WAT.Card,.WAT.Overlay,.WAT.Control,.WAT.Compound')
      .forEach(function (Peer) {
        preserveUniqueIdIn(Peer as HTMLElement)
      })
    }

  /**** removeUniqueIdFrom ****/

    function removeUniqueIdFrom (Peer:HTMLElement):void {
      attr(Peer,'data-wat-unique-id',undefined)

      filtered(Peer.children,'.WAT.Card,.WAT.Overlay,.WAT.Control,.WAT.Compound')
      .forEach(function (Peer) {
        removeUniqueIdFrom(Peer as HTMLElement)
      })
    }

    triggerRecursively('before-serialization')
      if (withUniqueId) { preserveUniqueIdIn(Visual.Peer) }
        let Serialization = Visual.Peer.outerHTML
      if (withUniqueId) { removeUniqueIdFrom(Visual.Peer) }
    triggerRecursively('after-serialization')

    return Serialization
  }

/**** parsedSerialization ****/

  type WAT_parsedSerialization = {
    serializedResources:string[], serializedMasters:string[],
    serializedApplets:string[],   serializedCards:string[],
    serializedOverlays:string[],  serializedComponents:string[]
  }

  export function parsedSerialization (Serialization:string):WAT_parsedSerialization {
    expectText('serialization',Serialization)

    let serializedResources:string[] = [], serializedMasters:string[]    = []
    let serializedApplets:string[]   = [], serializedCards:string[]      = []
    let serializedOverlays:string[]  = [], serializedComponents:string[] = []

    let ElementType:undefined | (
      'literalStyle' | 'externalStyle' | 'literalScript' | 'externalScript' |
      'Master' | 'Applet' | 'Card' | 'Overlay' | 'Component'
    ), ElementContent:any
    let HTMLParserCallbacks = {
      processStartTag: function processStartTag (
        TagName:string, Attributes:HTMLAttribute[], isUnary:boolean, isTopLevel:boolean
      ) {
        if (isTopLevel) {
          switch (TagName) {
            case 'link':
              if (
                (AttributeFrom('rel',Attributes) === 'stylesheet') &&
                (ValueIsURL(AttributeFrom('href',Attributes)))
              ) {
                serializedResources.push(
                  deserializedTag(TagName,Attributes,isUnary)
                )
              } else {
                throwError('InvalidSerialization: invalid "link" element encountered')
              }
              break
            case 'style':
              let Type = AttributeFrom('type',Attributes)
              if ((Type == null) || (Type === 'text/css')) {
                ElementType    = 'literalStyle'
                ElementContent = deserializedTag(TagName,Attributes,false)
              } else {
                throwError('InvalidSerialization: invalid "style" element encountered')
              }
              break
            case 'script':
              switch (AttributeFrom('type',Attributes)) {
                case 'application/wat-master':
                  ElementType    = 'Master'
                  ElementContent = deserializedTag(TagName,Attributes,false)
                  break
                case 'application/javascript':
                case 'text/javascript':
                  ElementType = (
                    (AttributeFrom('src',Attributes) == null)
                    ? 'literalScript'
                    : 'externalScript'
                  )
                  ElementContent = deserializedTag(TagName,Attributes,false)
                  break
                default: throwError(
                  'InvalidSerialization: invalid "script" element encountered'
                )
              }
              break
            case 'div':
              let Classes = AttributeFrom('class',Attributes) || ''
              if (/(^|\s)WAT(\s|$)/.test(Classes)) {
                switch (true) {
                  case /(^|\s)Applet(\s|$)/.test(Classes):             ElementType = 'Applet';    break
                  case /(^|\s)Card(\s|$)/.test(Classes):               ElementType = 'Card';      break
                  case /(^|\s)Overlay(\s|$)/.test(Classes):            ElementType = 'Overlay';   break
                  case /(^|\s)(Control|Compound)(\s|$)/.test(Classes): ElementType = 'Component'; break
                  default: throwError(
                    'InvalidSerialization: invalid "div" element encountered'
                  )
                }
                ElementContent = deserializedTag(TagName,Attributes,false)
              } else {
                throwError('InvalidSerialization: invalid "div" element encountered')
              }
            default:
              throwError(
                'InvalidSerialization: invalid "' + TagName.toLowerCase() + '" ' +
                'element encountered'
              )
          }
        } else {
          if (ElementContent !== undefined) {
            ElementContent += deserializedTag(TagName,Attributes,isUnary)
          }
        }
      },
      processEndTag: function processEndTag (TagName:string, isTopLevel:boolean) {
        if (isTopLevel) {
          ElementContent += '</' + TagName + '>'

          switch (TagName) {
            case 'style':
              serializedResources.push(ElementContent)
              break
            case 'script':
              switch (ElementType) {
                case 'Master':         serializedMasters.push(ElementContent); break
                case 'literalScript':
                case 'externalScript': serializedResources.push(ElementContent)
              }
              break
            case 'div':
              ElementContent += '</' + TagName + '>'
              switch (ElementType) {
                case 'Applet':    serializedApplets.push(ElementContent);    break
                case 'Card':      serializedCards.push(ElementContent);      break
                case 'Overlay':   serializedOverlays.push(ElementContent);   break
                case 'Component': serializedComponents.push(ElementContent); break
              }
          }
          ElementType = ElementContent = undefined
        } else {
          if (ElementContent !== undefined) {
            ElementContent += '</' + TagName + '>'
          }
        }
      },
      processText: function processText (Text:string, isTopLevel:boolean) {
        if (ElementContent !== undefined) {
          ElementContent += Text
        }
      },
    }

    parseHTML(Serialization, HTMLParserCallbacks)

    return {
      serializedResources, serializedMasters,  serializedApplets,
      serializedCards,     serializedOverlays, serializedComponents
    }
  }

/**** deserializedMaster ****/

  export function deserializedMaster(Serialization:string):WAT_MasterInfo {
    expectText('serialization',Serialization)

    let MasterObject
    try {
      MasterObject = JSON.parse(Serialization)
    } catch (Signal) {
      throwError(
        'InvalidSerialization: the given serialized master does not contain ' +
        'a master specification'
      )
    }

    return parsedMaster(MasterObject)
  }

/**** deserializeAppletIntoPeer - Peer remains the same! ****/

  function deserializeAppletIntoPeer(
    Serialization:string, Peer:HTMLElement, CollisionHandling:WAT_CollisionHandling
  ):void {
    let { serializedMasters, serializedApplets } = parsedSerialization(Serialization)
    if (serializedApplets.length === 0) throwError(
      'InvalidSerialization: the given serialization does not contain any applets'
    )
    if (serializedApplets.length  >  1) throwError(
      'InvalidSerialization: the given serialization contains multiple applets'
    )

  /**** clear old applet ****/

    let duringStartUp = (WAT_isReady && ! WAT_isRunning)
    if (duringStartUp) {
      html(Peer,'')
    } else {
      let oldApplet = VisualOfElement(Peer) as WAT_Applet
        oldApplet.CardList.forEach((Card:WAT_Card) => Card.remove())
        oldApplet.OverlayList.forEach((Overlay:WAT_Overlay) => Overlay.remove())
      html(Peer,'')          // also removes mandatory card (w/o event handlers)

      InternalsForVisual.delete(oldApplet)
    }

  /**** if need be: install given masters ****/

    if (serializedMasters.length > 0) {
      let MasterInfoList:WAT_MasterInfo[] = []
        serializedMasters.forEach(
          (serializedMaster) => MasterInfoList.push(
            deserializedMaster(serializedMaster)
          )
        )
      MasterInfoList.forEach(
        (MasterInfo) => {
          if (! MasterIsIntrinsic(MasterInfo.Name)) {
            registerMaster(MasterInfo)
          }
        }
      )
    }

    let auxiliaryPeer = ElementFromHTML(serializedApplets[0])
      while (auxiliaryPeer.hasChildNodes()) {
        Peer.appendChild(auxiliaryPeer.firstChild as ChildNode)
      }

      let AttributeList = auxiliaryPeer.attributes
      for (let i = 0, l = AttributeList.length; i < l; i++) {
        let AttributeName = AttributeList[i].name
        switch (AttributeName) {
          case 'id': case 'class': case 'style': break
          default: attr(Peer,AttributeName,AttributeList[i].value)
        }
      }

      let StyleSet = auxiliaryPeer.style
      for (let Property in StyleSet) {
        switch (Property) {
          case 'display': case 'position':
          case 'left': case 'width': case 'right': case 'top':
          case 'height': case 'bottom': break
          default: if (StyleSet.hasOwnProperty(Property)) {
            css(Peer,Property,StyleSet[Property])
          }
        }
      }
    let newApplet = VisualBuiltFromPeer(Peer,'Applet') // actually builds applet
  }

/**** AppletDeserializedFrom ****/

  export function AppletDeserializedFrom(
    oldApplet:WAT_Applet, Serialization:string
  ):WAT_Applet {
    expectApplet     ('applet',oldApplet)
    expectText('serialization',Serialization)

    let Peer = oldApplet.Peer
      deserializeAppletIntoPeer(Serialization, Peer, {
        compatibleDowngrade:  'perform',
        incompatibleDowngrade:'perform',
        sameVersion:          'perform',
        compatibleUpgrade:    'perform',
        incompatibleUpgrade:  'perform'
      })
    return VisualOfElement(Peer) as WAT_Applet
  }

//----------------------------------------------------------------------------//
//                               Import/Export                                //
//----------------------------------------------------------------------------//

//----------------------------------------------------------------------------//
//                             Property Handling                              //
//----------------------------------------------------------------------------//

  const internalPropertyNames:WAT_Identifier[] = `
    uniqueId Id Name Label Category Master ErrorInfo mayBeDesigned mayBeDeleted
    Classes isVisible isEnabled Value Script pendingScript pendingScriptError
    TabIndex PointerSensitivity Overflows TextOverflow Opacity
    x y Width Height Position Size Geometry GeometryOnDisplay
    horizontalAnchoring verticalAnchoring horizontalOffsets verticalOffsets
    minWidth maxWidth minHeight maxHeight
    FontFamily FoltSize FontWeight FontStyle TextDecoration TextShadow
    TextAlignment ForegroundColor Color BackgroundColor BackgroundTexture
    BorderWidths BorderColors BorderStyles BorderRadii BoxShadow
    Cursor customCursor
  `.trim().replace(/\s+/g,' ').split(' ')

  const internalPropertyNameSet = Object.create(null)
  internalPropertyNames.forEach(
    (PropertyName) => internalPropertyNameSet[PropertyName] = PropertyName
  )

/**** expectedProperty ****/

  function expectedProperty (Description:string, Value:any):WAT_Property {
    expectPlainObject(Description,Value)

    let Identifier = Value.Identifier
    if (! ValueIsIdentifier(Identifier)) throwError(
      'InvalidArgument: invalid property name ' + quoted(Identifier)
    )

    validatePropertyName(Identifier)

    let Label = Value.Label
    switch (true) {
      case (Label == null):        Label = Identifier;                 break
      case ValueIsTextline(Label): Label = Label.trim() || Identifier; break
      default: throwError(
        'InvalidArgument: the label of property ' + quoted(Identifier) +
        ' does not consist of a single line of text'
      )
    }

    let EditorType = Value.EditorType
    switch (true) {
      case (EditorType == null): throwError(
        'InvalidArgument: missing editor type for property ' + quoted(Identifier)
      )
      case ! ValueIsOneOf(EditorType,WAT_PropertyEditorTypes): throwError(
        'InvalidArgument: invalid editor type given for property ' + quoted(Identifier)
      )
    }

    let Property:WAT_Property = { Identifier, Label, EditorType }
      let InputPattern
      switch (EditorType) {
        case 'checkbox':
          break;
        case 'choice':                       // drop-down for boolean properties
          Property.FalseValue = expectedTextline('label for value "false"', Value.FalseValue)
          Property.TrueValue  = expectedTextline('label for value "true"',  Value.TrueValue)
          break
        case 'textline-input':
        case 'password-input':
        case 'email-address-input':
        case 'phone-number-input':
        case 'url-input':
        case 'search-input':
          if (Value.minLength != null) {
            Property.minLength = expectedIntegerInRange('minimal input length', Value.minLength, 0)
          }
          if (Value.maxLength != null) {
            Property.maxLength = expectedIntegerInRange('maximal input length', Value.maxLength, 0)
          }
          if ((Value.multiple != null) && (EditorType === 'email-address-input')) {
            Property.multiple = expectedBoolean('multi-value flag', Value.multiple)
          }
          if (Value.Pattern != null) {
            Property.Pattern = expectedTextline('input pattern', Value.Pattern)
          }
          break
        case 'number-input':
          if (Value.minValue != null) {
            Property.minValue = expectedNumber('minimal allowed value', Value.minValue)
          }
          if (Value.maxValue != null) {
            Property.maxValue = expectedNumber('maximal allowed value', Value.maxValue)
          }
          if (Value.StepValue != null) {
            if (Value.StepValue === 'any') {
              Property.StepValue = 'any'
            } else {
              Property.StepValue = expectedNumberInRange('step value', Value.StepValue, 0,Infinity, false)
            }
          }
          break
        case 'time-input':
          InputPattern = /^[0-9]{2}:[0-9]{2}$/
        case 'date-time-input':
          InputPattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$/
        case 'date-input':
          InputPattern = InputPattern || /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
        case 'month-input':
          InputPattern = InputPattern || /^[0-9]{4}-[0-9]{2}$/
        case 'week-input':
          InputPattern = InputPattern || /^[0-9]{4}-W[0-9]{2}$/

          if (Value.minValue != null) {
            Property.minValue = expectedStringMatching('minimal allowed value', Value.minValue, InputPattern)
          }
          if (Value.maxValue != null) {
            Property.maxValue = expectedStringMatching('maximal allowed value', Value.maxValue, InputPattern)
          }
          if (Value.StepValue != null) {
            if (Value.StepValue === 'any') {
              Property.StepValue = 'any'
            } else {
              Property.StepValue = expectedIntegerInRange('step value', Value.StepValue, 0)
            }
          }
          break
        case 'color-input':
          break
        case 'drop-down':
          Property.ValueList = expectedArray('list of allowed values',Value.ValueList)
            for (let i = 0, l = Property.ValueList.length; i < l; i++) {
              if (! ValueIsTextline(Property.ValueList[i])) throwError(
                'InvalidArgument: element #' + (i+1) + ' of the list of ' +
                'foreseen drop-down values is not a valid line of text'
              )
            }
          break
        case 'slider':
          if (Value.minValue != null) {
            Property.minValue = expectedNumber('minimal allowed value', Value.minValue)
          }
          if (Value.maxValue != null) {
            Property.maxValue = expectedNumber('maximal allowed value', Value.maxValue)
          }
          if (Value.StepValue != null) {
            if (Value.StepValue === 'any') {
              Property.StepValue = 'any'
            } else {
              Property.StepValue = expectedNumberInRange('step value', Value.StepValue, 0,Infinity, false)
            }
          }
          break
        case 'text-input':
        case 'html-input':
        case 'css-input':
        case 'javascript-input':
        case 'json-input':
          if (Value.minLength != null) {
            Property.minLength = expectedIntegerInRange('minimal input length', Value.minLength, 0)
          }
          if (Value.maxLength != null) {
            Property.maxLength = expectedIntegerInRange('maximal input length', Value.maxLength, 0)
          }
      }

    return Property
  }

/**** defineForbiddenPropertyNames ****/

  function defineForbiddenPropertyNames ():void {
    function processPrototype (Prototype:any) {
      for (let PropertyName in Prototype) {
        if (Prototype.hasOwnProperty(PropertyName)) {
          forbiddenPropertyNames[PropertyName] = PropertyName
        }
      }
    }

    processPrototype(WAT_Visual.prototype)
    processPrototype(WAT_Applet.prototype)
    processPrototype(WAT_Container.prototype)
    processPrototype(WAT_Layer.prototype)
    processPrototype(WAT_Card.prototype)
    processPrototype(WAT_Overlay.prototype)
    processPrototype(WAT_Compound.prototype)
    processPrototype(WAT_Control.prototype)

    delete forbiddenPropertyNames['Value']
  }                                     // n.b. "Value" is deliberately allowed!

/**** validatePropertyName ****/

  function validatePropertyName (Identifier:WAT_Identifier):void {
    if (Identifier in forbiddenPropertyNames) throwError(
      'InvalidArgument: forbidden property name ' + quoted(Identifier)
    )
  }

/**** definePropertyGetterForVisual ****/

  function definePropertyGetterForVisual (
    Visual:WAT_Visual, Property:WAT_Identifier, Getter:Function
  ):void {
    expectIdentifier('property name',Property)
    allowFunction ('property getter',Getter)

    let Descriptor = PropertyDescriptorFor(Visual,Property)
    if (Descriptor == null) {
      Descriptor = {
        get:Getter, set:function () { throwReadOnlyError(Property) },
        configurable:true, enumerable:true
      }
    } else {
      if (typeof Descriptor.value === 'function') throwError(
        'InvalidProperty: method ' + quoted(Property) + ' must not be redefined as a property'
      )

      if (Descriptor.configurable == false) throwError(
        'InvalidProperty: property ' + quoted(Property) + ' cannot be redefined'
      )

      delete Descriptor.value
      delete Descriptor.writable

      Descriptor.get = Getter
      Descriptor.set = Descriptor.set || function () { throwReadOnlyError(Property) }
    }

    Object.defineProperty(Visual,Property,Descriptor)
  }

/**** definePropertySetterForVisual ****/

  function definePropertySetterForVisual (
    Visual:WAT_Visual, Property:WAT_Identifier, Setter:Function
  ):void {
    expectIdentifier('property name',Property)
    allowFunction ('property setter',Setter)

    let Descriptor = PropertyDescriptorFor(Visual,Property)
    if (Descriptor == null) {
      Descriptor = {
        get:function () { throwWriteOnlyError(Property) }, set:Setter,
        configurable:true, enumerable:true
      }
    } else {
      if (typeof Descriptor.value === 'function') throwError(
        'InvalidProperty: method ' + quoted(Property) + ' must not be redefined as a property'
      )

      if (Descriptor.configurable == false) throwError(
        'InvalidProperty: property ' + quoted(Property) + ' cannot be redefined'
      )

      delete Descriptor.value
      delete Descriptor.writable

      Descriptor.get = Descriptor.get || function () { throwWriteOnlyError(Property) }
      Descriptor.set = Setter
    }

    Object.defineProperty(Visual,Property,Descriptor)
  }

//----------------------------------------------------------------------------//
//                             Geometry Handling                              //
//----------------------------------------------------------------------------//

/**** outerPeerOf ****/

  function outerPeerOf (Peer:HTMLElement):HTMLElement {
    let Candidate = Peer.parentElement
    if (Candidate == null) throwError(
      'ImpossibleOperation: a detached visual can not be right or bottom aligned'
    )
    return Candidate
  }

/**** GeometryOfVisual ****/

  function GeometryOfVisual (Visual:WAT_Visual):WAT_Geometry {
    let Peer = PeerOfVisual(Visual)
    return {
      x:Peer.offsetLeft, Width:Peer.offsetWidth,
      y:Peer.offsetTop, Height:Peer.offsetHeight
    }
  }

/**** GeometryOfVisualOnDisplay ****/

  function GeometryOfVisualOnDisplay (Visual:WAT_Visual):WAT_Geometry {
    let boundingRect = PeerOfVisual(Visual).getBoundingClientRect()
    return {
      x:boundingRect.left, Width:boundingRect.width,
      y:boundingRect.top, Height:boundingRect.height
    }
  }

/**** changeGeometryOfVisualTo ****/

  function changeGeometryOfVisualTo (
    Visual:WAT_Visual, x?:number, y?:number, Width?:number, Height?:number
  ):void {
    const Peer = PeerOfVisual(Visual)

    let StyleChanges:any = {}
    function changeStyles (additionalChanges:any):void {
      Object.assign(StyleChanges,additionalChanges)
    }

  /**** compute horizontal geometry update ****/

    let horizontalAnchoring, oldLeft,oldWidth,oldRight
    if ((x != null) || (Width != null)) {
      horizontalAnchoring = horizontalAnchoringOfVisual(Visual)
      oldLeft  = Math.round(Peer.offsetLeft)
      oldWidth = Math.round(Peer.offsetWidth)
    }

    if (x != null) {
      oldRight = (horizontalAnchoring === 'left-width' ? NaN : outerPeerOf(Peer).offsetWidth-(oldLeft as number)-(oldWidth as number))

      x = Math.round(x)
      let dx = x-(oldLeft as number)

      switch (horizontalAnchoring) {
        case 'left-width':  changeStyles({ left:x+'px'                           }); break
        case 'width-right': changeStyles({              right:(oldRight-dx)+'px' }); break
        case 'left-right':  changeStyles({ left:x+'px', right:(oldRight-dx)+'px' }); break
      }
    }

    if (Width != null) {
      Width = Math.round(Width)
      if (horizontalAnchoring === 'left-right') {
        oldRight = (StyleChanges.right != null ? parseFloat(StyleChanges.right) : outerPeerOf(Peer).offsetWidth-(oldLeft as number)-(oldWidth as number))
        changeStyles({ right:(oldRight - (Width-(oldWidth as number)))+'px' })
      } else {
        changeStyles({ width:Width+'px' })
      }
    }

  /**** compute vertical geometry update ****/

    let verticalAnchoring, oldTop,oldHeight,oldBottom
    if ((y != null) || (Height != null)) {
      verticalAnchoring = verticalAnchoringOfVisual(Visual)
      oldTop    = Math.round(Peer.offsetTop)
      oldHeight = Math.round(Peer.offsetHeight)
    }

    if (y != null) {
      oldBottom = (verticalAnchoring === 'top-height' ? NaN : outerPeerOf(Peer).offsetHeight-(oldTop as number)-(oldHeight as number))

      y = Math.round(y)
      let dy = y-(oldTop as number)

      switch (verticalAnchoring) {
        case 'top-height':    changeStyles({ top:y+'px'                             }); break
        case 'height-bottom': changeStyles({             bottom:(oldBottom-dy)+'px' }); break
        case 'top-bottom':    changeStyles({ top:y+'px', bottom:(oldBottom-dy)+'px' }); break
      }
    }

    if (Height != null) {
      Height = Math.round(Height)
      if (verticalAnchoring === 'top-bottom') {
        oldBottom = (StyleChanges.bottom != null ? parseFloat(StyleChanges.bottom) : outerPeerOf(Peer).offsetHeight-(oldTop as number)-(oldHeight as number))
        changeStyles({ bottom:(oldBottom - (Height-(oldHeight as number)))+'px' })
      } else {
        changeStyles({ height:Height+'px' })
      }
    }

  /**** now actually update the visual ****/

    if (! ObjectIsEmpty(StyleChanges)) {
      applyStylesToVisual(Visual, StyleChanges)
    }
  }

/**** horizontalAnchoringOfVisual ****/

  function horizontalAnchoringOfVisual (Visual:WAT_Visual):WAT_horizontalAnchoring {
    let Peer = PeerOfVisual(Visual)

    let left  = Peer.style.left  || 'auto'
    let right = Peer.style.right || 'auto'
    let Width = Peer.style.width || 'auto'

    if (right === 'auto') { return 'left-width' }
    if (Width === 'auto') { return 'left-right' }
    if (left  === 'auto') { return 'width-right' }            // check this last

    console.error(
      'could not determine horizontal anchors of given Visual\n' +
      'got left:' + left + ', right:' + right + ', width:' + Width
    )

    return 'left-width'
  }

/**** horizontalOffsetsOfVisual ****/

  function horizontalOffsetsOfVisual (Visual:WAT_Visual):WAT_horizontalOffsets {
    let Peer = PeerOfVisual(Visual)

    let left  = Math.round(Peer.offsetLeft)
    let width = Math.round(Peer.offsetWidth)
//  let right = Math.round(outerPeerOf(Peer).offsetWidth-left-width)

    switch (horizontalAnchoringOfVisual(Visual)) {
      case 'left-width':  return [left,width]
      case 'width-right': return [width,Math.round(outerPeerOf(Peer).offsetWidth-left-width)]
      case 'left-right':  return [left, Math.round(outerPeerOf(Peer).offsetWidth-left-width)]
      default:            return [left,width]
    }
  }

/**** changeHorizontalAnchoringOfVisualTo ****/

  function changeHorizontalAnchoringOfVisualTo (
    Visual:WAT_Visual, newAnchoring:WAT_horizontalAnchoring
  ):void {
    let oldAnchoring = horizontalAnchoringOfVisual(Visual)
    if (oldAnchoring === newAnchoring) { return }

    let Peer = PeerOfVisual(Visual)

    let left  = Math.round(Peer.offsetLeft)
    let Width = Math.round(Peer.offsetWidth)
    let right = Math.round(outerPeerOf(Peer).offsetWidth-left-Width)

    let StyleSet
      switch (newAnchoring) {
        case 'left-width':  StyleSet = { left:left+'px', width:Width+'px', right:'auto' };     break
        case 'width-right': StyleSet = { left:'auto',    width:Width+'px', right:right+'px' }; break
        case 'left-right':  StyleSet = { left:left+'px', width:'auto',     right:right+'px' }; break
        default: throwError('InternalError: unforeseen horizontal anchoring')
      }
    applyStylesToVisual(Visual,StyleSet)
  }

/**** changeHorizontalOffsetsOfVisualTo ****/

  function changeHorizontalOffsetsOfVisualTo (
    Visual:WAT_Visual, offsets:WAT_horizontalOffsets
  ):void {
    let Peer = PeerOfVisual(Visual)

    switch (horizontalAnchoringOfVisual(Visual)) {
      case 'left-width':
        if (offsets[0] != null) { applyStyleToVisual(Visual, 'left', Math.round(offsets[0])+'px') }
        if (offsets[1] != null) { applyStyleToVisual(Visual, 'width',Math.round(offsets[1])+'px') }
        break
      case 'width-right':
        if (offsets[0] != null) { applyStyleToVisual(Visual, 'width',Math.round(offsets[0])+'px') }
        if (offsets[1] != null) { applyStyleToVisual(Visual, 'right',Math.round(offsets[1])+'px') }
        break
      case 'left-right':
        if (offsets[0] != null) { applyStyleToVisual(Visual, 'left', Math.round(offsets[0])+'px') }
        if (offsets[1] != null) { applyStyleToVisual(Visual, 'right',Math.round(offsets[1])+'px') }
    }
  }

/**** verticalAnchoringOfVisual ****/

  function verticalAnchoringOfVisual (Visual:WAT_Visual):WAT_verticalAnchoring {
    let Peer = PeerOfVisual(Visual)

    let top    = Peer.style.top    || 'auto'
    let bottom = Peer.style.bottom || 'auto'
    let Height = Peer.style.height || 'auto'

    if (bottom === 'auto') { return 'top-height' }
    if (Height === 'auto') { return 'top-bottom' }
    if (top    === 'auto') { return 'height-bottom' }         // check this last

    console.error(
      'could not determine vertical anchors of given Visual\n' +
      'got top:' + top + ', bottom:' + bottom + ', height:' + Height
    )

    return 'top-height'
  }

/**** verticalOffsetsOfVisual ****/

  function verticalOffsetsOfVisual (Visual:WAT_Visual):WAT_verticalOffsets {
    let Peer = PeerOfVisual(Visual)

    let top    = Math.round(Peer.offsetTop)
    let height = Math.round(Peer.offsetHeight)
//  let bottom = Math.round(outerPeer().offsetHeight-top-height)

    switch (verticalAnchoringOfVisual(Visual)) {
      case 'top-height':    return [top,height]
      case 'height-bottom': return [height,Math.round(outerPeerOf(Peer).offsetHeight-top-height)]
      case 'top-bottom':    return [top,   Math.round(outerPeerOf(Peer).offsetHeight-top-height)]
      default:              return [top,height]
    }
  }

/**** changeVerticalAnchoringOfVisualTo ****/

  function changeVerticalAnchoringOfVisualTo (
    Visual:WAT_Visual, newAnchoring:WAT_verticalAnchoring
  ):void {
    let oldAnchoring = verticalAnchoringOfVisual(Visual)
    if (oldAnchoring === newAnchoring) { return }

    let Peer = PeerOfVisual(Visual)

    let top    = Math.round(Peer.offsetTop)
    let Height = Math.round(Peer.offsetHeight)
    let bottom = Math.round(outerPeerOf(Peer).offsetHeight-top-Height)

    let StyleSet
      switch (newAnchoring) {
        case 'top-height':    StyleSet = { top:top+'px', height:Height+'px', bottom:'auto' }; break
        case 'height-bottom': StyleSet = { top:'auto',   height:Height+'px', bottom:bottom+'px' }; break
        case 'top-bottom':    StyleSet = { top:top+'px', height:'auto',      bottom:bottom+'px' }; break
        default: throwError('InternalError: unforeseen vertical anchoring')
      }
    applyStylesToVisual(Visual,StyleSet)
  }

/**** changeVerticalOffsetsOfVisualTo ****/

  function changeVerticalOffsetsOfVisualTo (
    Visual:WAT_Visual, offsets:WAT_verticalOffsets
  ):void {
    switch (verticalAnchoringOfVisual(Visual)) {
      case 'top-height':
        if (offsets[0] != null) { applyStyleToVisual(Visual, 'top',   Math.round(offsets[0])+'px') }
        if (offsets[1] != null) { applyStyleToVisual(Visual, 'height',Math.round(offsets[1])+'px') }
        break
      case 'height-bottom':
        if (offsets[0] != null) { applyStyleToVisual(Visual, 'height',Math.round(offsets[0])+'px') }
        if (offsets[1] != null) { applyStyleToVisual(Visual, 'bottom',Math.round(offsets[1])+'px') }
        break
      case 'top-bottom':
        if (offsets[0] != null) { applyStyleToVisual(Visual, 'top',   Math.round(offsets[0])+'px') }
        if (offsets[1] != null) { applyStyleToVisual(Visual, 'bottom',Math.round(offsets[1])+'px') }
    }
  }

//----------------------------------------------------------------------------//
//                             Master Management                              //
//----------------------------------------------------------------------------//

  type WAT_StyleSet    = { [Key:string]:(string | undefined) }
  type WAT_PropertySet = { [Key:string]:string }

  type WAT_MasterInfo = {
    Name:WAT_Name, Version?:WAT_normalizedVersion, Category:WAT_Category,
    Resources?:WAT_Text,  pendingResources?:WAT_Text,
    Template:WAT_Text,    pendingTemplate?:WAT_Text,
    Classes?:WAT_Name[],  pendingClasses?:WAT_Name[],
    Styles?:WAT_StyleSet, pendingStyles?:WAT_StyleSet,
    Script?:WAT_Text,     pendingScript?:WAT_Text,
    Properties?:WAT_Property[], undesignablePropertySet?:WAT_PropertySet,
    ErrorInfo?:WAT_ErrorInfo, compiledScript?:Function, UsageCount:number
  }

  const WAT_VersionHandlings = [ 'perform','ignore','abort' ]
  type  WAT_VersionHandling  = typeof WAT_VersionHandlings[number]

  type WAT_CollisionHandling = {
    compatibleDowngrade:WAT_VersionHandling,
    incompatibleDowngrade:WAT_VersionHandling,
    sameVersion:WAT_VersionHandling,
    compatibleUpgrade:WAT_VersionHandling,
    incompatibleUpgrade:WAT_VersionHandling
  }

  type WAT_MasterRegistry = { [Name:string]:WAT_MasterInfo }

  const MasterRegistry:WAT_MasterRegistry = Object.create(null)

/**** MasterInfoFromElement (script[type="application/wat-master"]) ****/

  function MasterInfoFromElement (Element:HTMLElement):WAT_MasterInfo {
    let MasterObject = JSON.parse(html(Element))
    return parsedMaster(MasterObject)
  }

/**** parsedMaster - fundamental errors prevent a master from being imported ****/

  function parsedMaster (MasterObject:any):WAT_MasterInfo {
    expectPlainObject('master specification',MasterObject)

    let Name = expectedName('master name',MasterObject.Name)
    if (Name.startsWith('#')) {
      throwError('InvalidImport: the name of a master must not be global')
    }

    let Version  = normalized(parsedVersion(allowedSemVer('master version',MasterObject.Version) || '0.0.1'))
    let Category = expectedOneOf('master category',MasterObject.Category, WAT_Categories)

    let Resources = allowedText('master resources',MasterObject.Resources)
      if ((Resources != null) && (Resources.trim() === '')) { Resources = null }
    let pendingResources = allowedText('pending master resources',MasterObject.pendingResources)
      if ((pendingResources != null) && (pendingResources.trim() === '')) { pendingResources = null }

    let Template = allowedText('master template',MasterObject.Template)
      if ((Template != null) && (Template.trim() === '')) {
        Template = '<div class="WAT ' + Name + '"></div>'
      }
    let pendingTemplate = allowedText('pending master template',MasterObject.pendingTemplate)
      if ((pendingTemplate != null) && (pendingTemplate.trim() === '')) { pendingTemplate = null }

    let Classes        = parsedClasses(MasterObject.Classes)
    let pendingClasses = allowedTextline('pending master classes',MasterObject.pendingClasses)

    let Styles        = parsedStyles(MasterObject.Styles)
    let pendingStyles = allowedText('pending master CSS styles',MasterObject.pendingStyles)

    let Script        = allowedText        ('master script',MasterObject.Script)
    let pendingScript = allowedText('pending master script',MasterObject.pendingScript)

    let Properties = parsedProperties(MasterObject.Properties)
    let undesignablePropertySet = parsedUndesignableProperties(MasterObject.undesignableProperties)

    let plainMaster = 'plain' + Category
    if (Name !== plainMaster) {  // protect certain properties based on category
      for (let PropertyName in MasterRegistry[plainMaster].undesignablePropertySet) {
        undesignablePropertySet[PropertyName] = PropertyName
      }
    }

    return {
      Name, Version, Category,
      Resources, pendingResources, Template, pendingTemplate,
      Classes, pendingClasses, Styles, pendingStyles, Script, pendingScript,
      Properties, undesignablePropertySet,
      ErrorInfo:undefined, compiledScript:undefined, UsageCount:0
    }
  }

  export const WAT_PropertyEditorTypes = [
    'checkbox', 'choice',
    'textline-input', 'password-input', 'number-input', 'search-input',
    'phone-number-input', 'email-address-input', 'url-input',
    'time-input', 'date-time-input', 'date-input', 'month-input', 'week-input',
    'color-input', 'drop-down', 'slider',
    'text-input', 'html-input', 'css-input', 'javascript-input', 'json-input'
  ]
  export type WAT_PropertyEditorType = typeof WAT_PropertyEditorTypes[number]

  export type WAT_Property = {
    Identifier:WAT_Identifier, Label:WAT_Textline,
    EditorType:WAT_PropertyEditorType
  } & {                              // plus additional editor-specific elements
    FalseValue?:string, TrueValue?:string,
    minLength?:number, maxLength?:number,
    multiple?:boolean, Pattern?:string,
    minValue?:any, maxValue?:any, StepValue?:'any'|number,
    ValueList?:any[]
  }

  const forbiddenPropertyNames = Object.create(null)     // will be filled later

/**** parsedProperties ****/

  function parsedProperties (Value:any):WAT_Property[] {
    allowArray('list of custom properties',Value)
    if ((Value == null) || (Value.length === 0)) { return [] }

    let PropertyList:WAT_Property[] = []
      let parsedPropertySet = Object.create(null)

      Value.forEach((Specification:any) => {
        let Property = expectedProperty('property specification',Specification)
        PropertyList.push(parsedPropertySet[Property.Identifier] = Property)
      })
    return PropertyList
  }

/**** parsedUndesignableProperties ****/

  function parsedUndesignableProperties (
    undesignableProperties:string
  ):WAT_PropertySet {
    allowText('list of undesignable properties',undesignableProperties)

    let Result:WAT_PropertySet = Object.create(null)
    if (undesignableProperties == null) { return Result }
      undesignableProperties.trim().replace(/\s+/g,' ').split(' ').forEach(
        (PropertyName) => {
          allowIdentifier('name of an undesignable property',PropertyName)
          Result[PropertyName] = PropertyName                 // no further test
        }
      )
    return Result
  }

/**** parsedClasses ****/

  function parsedClasses (Value:any):WAT_Name[] {
    allowText('master class presets',Value)
    if (Value == null) { return [] }

    let ClassNames = Value.trim().replace(/\s+/g,' ').split(' ')
      if (ClassNames.length === 0) { return [] }

      ClassNames.forEach((Value:any) => {
        if (! ValueIsName(Value)) throwError(
          'InvalidSpecification: master specification contains invalid ' +
          'class name ' + quoted(Value)
        )
      })
    return ClassNames
  }

/**** parsedStyles ****/

  function parsedStyles (Value:any):WAT_StyleSet | undefined {
    allowText('master style presets',Value)
    if (Value == null) { return undefined }

    Value = Value.trim()
    if (Value === '') { return undefined }

// see https://stackoverflow.com/questions/3326494/parsing-css-in-javascript-jquery

    let StyleElement = document.createElement('style')
    StyleElement.textContent = '#' + Math.round(Math.random()*9999) + ' {' + Value + '}'

    let auxDocument = document.implementation.createHTMLDocument('')
    auxDocument.body.appendChild(StyleElement)

    let StyleSet = (StyleElement.sheet?.cssRules[0] as CSSStyleRule).style
    let StylePresets = Object.create(null)
      for (let i = 0, l = StyleSet.length; i < l; i++) {
        let PropertyName  = StyleSet[i]
        let PropertyValue = StyleSet.getPropertyValue(PropertyName)
        StylePresets[PropertyName] = PropertyValue
      }
    return StylePresets
  }

/**** MasterMayBeRegistered ****/

  function MasterMayBeRegistered (
    MasterInfo:WAT_MasterInfo, CollisionHandling:WAT_CollisionHandling
  ):boolean {
    let Master = MasterInfo.Name
    if (MasterIsIntrinsic(Master)) throwError(
      'ForbiddenRegistration: intrinsic master ' + quoted(Master) + ' must ' +
      'not be replaced'
    )

    if (Master in MasterRegistry) {
      let Relationship = RelationshipAreplacingB(
        MasterInfo.Version as WAT_normalizedVersion,
        MasterRegistry[Master].Version as WAT_normalizedVersion
      )

// @ts-ignore we definitely want to index "CollisionHandling" with a string
      switch (CollisionHandling[Relationship]) {
        case 'perform': return true
        case 'ignore':  return false
        case 'abort': switch (Relationship) {
          case 'compatibleDowngrade': throwError(
            'ForbiddenImport: this import would result in a downgrade of ' +
            'master ' + quoted(Master)
          )
          case 'incompatibleDowngrade': throwError(
            'ForbiddenImport: this import would result in an incompatible ' +
            'downgrade of master ' + quoted(Master)
          )
          case 'sameVersion': throwError(
            'ForbiddenImport: this import would overwrite master ' + quoted(Master)
          )
          case 'compatibleUpgrade': throwError(
            'ForbiddenImport: this import would result in an upgrade of ' +
            'master ' + quoted(Master)
          )
          case 'incompatibleUpgrade': throwError(
            'ForbiddenImport: this import would result in an incompatible ' +
            'upgrade of master ' + quoted(Master)
          )
        }
      }
      return false
    } else {
      return true
    }
  }

/**** MasterIsIntrinsic ****/

  const intrinsicMasterSet = Object.create(null)
  'Applet Card Overlay Compound Control'.split(' ').forEach(
    (Category) => intrinsicMasterSet['plain'+Category] = true
  )

  function MasterIsIntrinsic (Master:WAT_Name):boolean {
    return (intrinsicMasterSet[Master] != null)
  }

/**** registerMastersInDocument ****/

  function registerMastersInDocument ():void {
    let ErrorOccurred = false
      forEach(
        document.head.querySelectorAll('script[type="application/wat-master"]'),
        (ScriptElement) => {
        try {
          let MasterInfo = MasterInfoFromElement(ScriptElement)
          if (MasterMayBeRegistered(MasterInfo, {            // n.b.: may throw!
            compatibleDowngrade:  'ignore',
            incompatibleDowngrade:'abort',
            sameVersion:          'ignore',
            compatibleUpgrade:    'perform',
            incompatibleUpgrade:  'perform'
          })) {
            registerMaster(MasterInfo)
          }
        } catch (Signal) {
          ErrorOccurred = true
          console.warn('Error in Master Registration:',Signal)
        }
      })
    if (ErrorOccurred) window.alert(
      'The WAT masters bundled with this document could not be\n' +
      'registered without errors - see browser console for details'
    )
  }

/**** registerMasterFromSerialization ****/

  export function registerMasterFromSerialization (Serialization:string):void {
    expectText('serialization',Serialization)

    let MasterObject = JSON.parse(Serialization)
    let MasterInfo   = parsedMaster(MasterObject)
    registerMaster(MasterInfo)
  }

/**** registerMaster ****/

  function registerMaster (MasterInfo:WAT_MasterInfo):void {
    if (MasterIsIntrinsic(MasterInfo.Name)) throwError(
      'ForbiddenOperation: an intrinsic master must not be (re-)registered'
    )

    MasterInfo.ErrorInfo = undefined
      if (MasterInfo.Resources != null) {
        registerResources(MasterInfo.Resources)
      }

      if (MasterInfo.Script != null) {
        compileScriptIntoMaster(MasterInfo.Script,MasterInfo)
      }
    MasterInfo.UsageCount = 0

    let Name = MasterInfo.Name
    MasterRegistry[Name] = MasterInfo
    if (WAT_isRunning) { refreshInstancesOfMaster(Name) }
  }

/**** unregisterMaster ****/

  export function unregisterMaster (Name:WAT_Name):void {
    if (MasterIsIntrinsic(Name)) throwError(
      'ForbiddenOperation: an intrinsic master must not be unregistered'
    )

    if (Name in MasterRegistry) {
      let MasterInfo = MasterRegistry[Name]
      if (MasterInfo.Resources != null) {
        unregisterResources(MasterRegistry[Name].Resources)
      }

      releaseMaster(Name)

      delete MasterRegistry[Name]
      if (WAT_isRunning) { refreshInstancesOfMaster(Name) }
    }
  }

/**** compileScriptIntoMaster ****/

  function compileScriptIntoMaster (
    Script:WAT_Text | undefined, MasterInfo:WAT_MasterInfo
  ):void {
    delete MasterInfo.compiledScript

    if (Script != null) {
      try {
        MasterInfo.compiledScript = new Function(
          'toGet','toSet','on','off','trigger','$', Script
        )
      } catch (Signal) {
        MasterInfo.ErrorInfo = {
          Title:       'Compilation Error',
          longMessage: 'Script of Master ' + quoted(MasterInfo.Name) + ' could not be compiled',
          shortMessage:Signal.message,
          Reason:      Signal,
          Applet:      firstAppletInDocument(),
          Sufferer:    MasterInfo.Name,
          Property:    'Script'
        }
      }
    }
  }

/**** releaseMaster ****/

  function releaseMaster (Master:WAT_Name):void {
    let MasterInfo = MasterRegistry[Master]
    if (MasterInfo == null) { return }

    off(document.body, 'mousedown mousemove mouseup','.' + Master)
    off(document.body, 'mouseenter mouseleave','.' + Master)
    off(document.body, 'keydown keypress keyup','.' + Master)
    off(document.body, 'input change click','.' + Master)

    let Resources = MasterInfo.Resources
    if (Resources != null) { unregisterResources(Resources) }
  }

/**** refreshInstancesOfMaster ****/

  function refreshInstancesOfMaster (Name:WAT_Name):void {
    if (WAT_isRunning) {
      forEach(
        document.body.querySelectorAll('.WAT[data-wat-master="' + Name + '"]'),
        (Peer) => refreshVisual(VisualOfElement(Peer as HTMLElement))
      )
    }
  }

/**** useMaster ****/

  function useMaster (Name:WAT_Name, Category:WAT_Category):void {
    let MasterInfo = MasterRegistry[Name]
    switch (true) {
      case (MasterInfo == null): throwError(
        'NoSuchMaster: a master with the name ' + quoted(Name) + ' does not exist'
      )
      case (MasterInfo.Category !== Category): throwError(
        'UnsuitableMaster: master ' + quoted(Name) + ' is not for ' + Category
      )
    }

    MasterInfo.UsageCount += 1
  }

/**** unuseMaster ****/

  function unuseMaster (Name:WAT_Name):void {
    let MasterInfo = MasterRegistry[Name]
    if (MasterInfo != null) {
      MasterInfo.UsageCount -= 1
    }
  }

/**** hasMaster ****/

  export function hasMaster (Name:WAT_Name):boolean {
    expectName('master name',Name)
    return (MasterRegistry[Name] != null)
  }

/**** lacksMaster ****/

  export function lacksMaster (Name:WAT_Name):boolean {
    expectName('master name',Name)
    return (MasterRegistry[Name] == null)
  }

/**** existingInfoForMaster ****/

  function existingInfoForMaster (Name:WAT_Name):WAT_MasterInfo {
    expectName('master name',Name)

    let MasterInfo = MasterRegistry[Name]
    if (MasterInfo == null) throwError(
      'NoSuchMaster: a master with the name ' + quoted(Name) + ' does not exist'
    )

    return MasterInfo
  }

/**** createMaster ****/

  export function createMaster (
    Name:WAT_Name, Category:WAT_Category, Version?:WAT_SemVer,
    Template?:WAT_Text
  ):void {
    expectName     ('master name',Name)
    expectOneOf('master category',Category, WAT_Categories)
    allowSemVer ('master version',Version)
    allowText  ('master template',Template)

    if (Name in MasterRegistry) throwError(
      'MasterExists: a master with the name ' + quoted(Name) + ' exists already'
    )

    let MasterInfo:WAT_MasterInfo = {
      Name, Category, Version:normalized(parsedVersion(Version || '0.0.1')),
      Template:Template || '<div class="WAT ' + Name + '"></div>',
      UsageCount:0
    }

    registerMaster(MasterInfo)
  }

/**** DuplicateOfMaster ****/

  export function DuplicateOfMaster (
    oldName:WAT_Name, newName:WAT_Name, newVersion?:WAT_normalizedVersion
  ):WAT_MasterInfo {
//  expectName    ('old master name',oldName) // done by "existingInfoForMaster"
    expectName    ('new master name',newName)
    allowSemVer('new master version',newVersion)

    if (newName in MasterRegistry) throwError(
      'MasterExists: a master with the name ' + quoted(newName) + ' exists already'
    )

    let oldMasterInfo = existingInfoForMaster(oldName)
    let newMasterInfo = Object.assign({},oldMasterInfo)
      newMasterInfo.Name = newName
      if (newVersion != null) { newMasterInfo.Version = newVersion }

      if (oldMasterInfo.Properties != null) {            // detach from original
        newMasterInfo.Properties = []
        oldMasterInfo.Properties.forEach(
          (Property) => (newMasterInfo.Properties as WAT_Property[]).push(Object.assign({},Property))
        )
      }
    registerMaster(newMasterInfo)
    return newMasterInfo
  }

/**** renameMaster ****/

  export function renameMaster (
    oldName:WAT_Name, newName:WAT_Name, updateInstances:boolean = true
  ):void {
//  expectName                 ('old master name',oldName)       // t.b.d. below
    expectName                 ('new master name',newName)
    allowBoolean('master instance update setting',updateInstances)

    let oldMasterInfo = existingInfoForMaster(oldName)
    if (oldName === newName) { return }

    let newMasterInfo = MasterRegistry[newName]
    if (newMasterInfo != null) throwError(
      'MasterExists: a master with the name ' + quoted(newName) + ' exists already'
    )

    delete MasterRegistry[oldName]
      oldMasterInfo.Name = newName
      ;(oldMasterInfo.Version as WAT_Version).Build = currentTimestamp()
    MasterRegistry[newName] = oldMasterInfo

    if (updateInstances) {
      forEach(
        document.body.querySelectorAll('.WAT[data-wat-master="' + oldName + '"]'),
        (Peer) => { data(Peer as HTMLElement,'wat-master',newName) }
      )

      if (WAT_isRunning) {
        refreshInstancesOfMaster(newName)
      }
    } else {
      if (WAT_isRunning) {
        refreshInstancesOfMaster(oldName)
        refreshInstancesOfMaster(newName)
      }
    }
  }

/**** [set]NameOfMaster ****/

  export function NameOfMaster (Name:WAT_Name):WAT_Name {
    let MasterInfo = existingInfoForMaster(Name)
    return Name
  }

  export function setNameOfMaster (oldName:WAT_Name, newName:WAT_Name):void {
    renameMaster(oldName,newName, true)
  }

/**** CategoryOfMaster ****/

  export function CategoryOfMaster (Name:WAT_Name):WAT_Category {
    let MasterInfo = existingInfoForMaster(Name)
    return MasterInfo.Category
  }

/**** [set]VersionOfMaster ****/

  export function VersionOfMaster (Name:WAT_Name):WAT_SemVer {
    let MasterInfo = existingInfoForMaster(Name) as WAT_MasterInfo
    return serializedVersion(MasterInfo.Version as WAT_Version)
  }

  export function setVersionOfMaster (Name:WAT_Name, newSemVer:WAT_SemVer):void {
    let MasterInfo = existingInfoForMaster(Name) as WAT_MasterInfo
    let newVersion = normalized(parsedVersion(newSemVer))
      if (VersionAgtB((MasterInfo.Version as WAT_normalizedVersion),newVersion)) throwError(
        'InvalidArgument: the new version of a master must be greater than ' +
        'the existing one'
      )
    MasterInfo.Version       = newVersion
    MasterInfo.Version.Build = currentTimestamp()
  }

/**** ResourcesOfMaster ****/

  export function ResourcesOfMaster (Name:WAT_Name):WAT_Text | undefined {
    let MasterInfo = existingInfoForMaster(Name)
    return MasterInfo.Resources
  }

/**** [set]PendingResourcesOfMaster ****/

  export function pendingResourcesOfMaster (Name:WAT_Name):WAT_Text | undefined {
    let MasterInfo = existingInfoForMaster(Name)
    return MasterInfo.pendingResources
  }

  export function setPendingResourcesOfMaster (
    Name:WAT_Name, newResources?:WAT_Text
  ):void {
//  expectName        ('master name',Name)  // t.b.d. by "existingInfoForMaster"
    allowText('new master resources',newResources)

    let MasterInfo = existingInfoForMaster(Name)
    if ((newResources == null) || (newResources.trim() === '')) {
      delete MasterInfo.pendingResources
    } else {
      MasterInfo.pendingResources = newResources
    }
  }

/**** activatePendingResourcesOfMaster ****/

  export function activatePendingResourcesOfMaster (Name:WAT_Name):void {
    let MasterInfo = existingInfoForMaster(Name)

    unregisterMaster(Name)       // because resources could contain side effects
      MasterInfo.Resources     = MasterInfo.pendingResources
      delete MasterInfo.pendingResources
      ;(MasterInfo.Version as WAT_Version).Build = currentTimestamp()
    registerMaster(MasterInfo)
  }

/**** TemplateOfMaster ****/

  export function TemplateOfMaster (Name:WAT_Name):WAT_Text | undefined {
    let MasterInfo = existingInfoForMaster(Name)
    return MasterInfo.Template
  }

/**** [set]PendingTemplateOfMaster ****/

  export function pendingTemplateOfMaster (Name:WAT_Name):WAT_Text | undefined {
    let MasterInfo = existingInfoForMaster(Name)
    return MasterInfo.pendingTemplate
  }

  export function setPendingTemplateOfMaster (
    Name:WAT_Name, newTemplate?:WAT_Text
  ):void {
//  expectName       ('master name',Name)   // t.b.d. by "existingInfoForMaster"
    allowText('new master template',newTemplate)

    let MasterInfo = existingInfoForMaster(Name)
    if ((newTemplate == null) || (newTemplate.trim() === '')) {
      delete MasterInfo.pendingTemplate
    } else {
      MasterInfo.pendingTemplate = newTemplate
    }
  }

/**** activatePendingTemplateOfMaster ****/

  export function activatePendingTemplateOfMaster (Name:WAT_Name):void {
    let MasterInfo = existingInfoForMaster(Name)
      if (MasterInfo.pendingTemplate == null) {
        MasterInfo.Template = '<div class="WAT ' + Name + '"></div>'
      } else {
        MasterInfo.Template = MasterInfo.pendingTemplate
        delete MasterInfo.pendingTemplate
      }
    ;(MasterInfo.Version as WAT_Version).Build = currentTimestamp()
  }

/**** ClassesOfMaster ****/

  export function ClassesOfMaster (Name:WAT_Name):WAT_Text {
    let MasterInfo = existingInfoForMaster(Name)
    return serializedClasses(MasterInfo.Classes)
  }

/**** [set]PendingClassesOfMaster ****/

  export function pendingClassesOfMaster (Name:WAT_Name):WAT_Text {
    let MasterInfo = existingInfoForMaster(Name)
    return serializedClasses(MasterInfo.pendingClasses)
  }

  export function setPendingClassesOfMaster (
    Name:WAT_Name, newClasses?:WAT_Text
  ):void {
//  expectName      ('master name',Name)    // t.b.d. by "existingInfoForMaster"
    allowText('new master classes',newClasses)

    let MasterInfo = existingInfoForMaster(Name)
    if ((newClasses == null) || (newClasses.trim() === '')) {
      delete MasterInfo.pendingClasses
    } else {
      MasterInfo.pendingClasses = parsedClasses(newClasses)
    }
  }

/**** activatePendingClassesOfMaster ****/

  export function activatePendingClassesOfMaster (Name:WAT_Name):void {
    let MasterInfo = existingInfoForMaster(Name)
      MasterInfo.Classes = MasterInfo.pendingClasses
      delete MasterInfo.pendingClasses
      ;(MasterInfo.Version as WAT_Version).Build = currentTimestamp()
    refreshInstancesOfMaster(Name)
  }

/**** serializedClasses ****/

  function serializedClasses (ClassNames:WAT_Name[] | undefined):WAT_Text {
    return (ClassNames == null ? '' : ClassNames.join(' '))
  }

/**** StylesOfMaster ****/

  export function StylesOfMaster (Name:WAT_Name):WAT_Text {
    let MasterInfo = existingInfoForMaster(Name)
    return serializedStyles(MasterInfo.Styles)
  }

/**** [set]PendingStylesOfMaster ****/

  export function pendingStylesOfMaster (Name:WAT_Name):WAT_Text {
    let MasterInfo = existingInfoForMaster(Name)
    return serializedStyles(MasterInfo.pendingStyles)
  }

  export function setPendingStylesOfMaster (
    Name:WAT_Name, newStyles?:WAT_Text
  ):void {
//  expectName     ('master name',Name)     // t.b.d. by "existingInfoForMaster"
    allowText('new master styles',newStyles)

    let MasterInfo = existingInfoForMaster(Name)
    if ((newStyles == null) || (newStyles.trim() === '')) {
      delete MasterInfo.pendingStyles
    } else {
      MasterInfo.pendingStyles = parsedStyles(newStyles)
    }
  }

/**** activatePendingStylesOfMaster ****/

  export function activatePendingStylesOfMaster (Name:WAT_Name):void {
    let MasterInfo = existingInfoForMaster(Name)
      MasterInfo.Styles = MasterInfo.pendingStyles
      delete MasterInfo.pendingStyles
      ;(MasterInfo.Version as WAT_Version).Build = currentTimestamp()
    refreshInstancesOfMaster(Name)
  }

/**** serializedStyles ****/

  function serializedStyles (StyleSet:WAT_StyleSet | undefined):WAT_Text {
    let Serialization = ''
      if (StyleSet != null) {
        for (let Key in StyleSet) {
          if (StyleSet.hasOwnProperty(Key)) {
            Serialization += Key + ':' + StyleSet[Key] + '; '
          }
        }
      }
    return Serialization
  }

/**** ScriptOfMaster ****/

  export function ScriptOfMaster (Name:WAT_Name):WAT_Text | undefined {
    let MasterInfo = existingInfoForMaster(Name)
    return MasterInfo.Script
  }

/**** [set]PendingScriptOfMaster ****/

  export function pendingScriptOfMaster (Name:WAT_Name):WAT_Text | undefined {
    let MasterInfo = existingInfoForMaster(Name)
    return MasterInfo.pendingScript
  }

  export function setPendingScriptOfMaster (
    Name:WAT_Name, newScript?:WAT_Text
  ):void {
//  expectName     ('master name',Name)     // t.b.d. by "existingInfoForMaster"
    allowText('new master script',newScript)

    let MasterInfo = existingInfoForMaster(Name)
    if ((newScript == null) || (newScript.trim() === '')) {
      delete MasterInfo.pendingScript
    } else {
      MasterInfo.pendingScript = newScript
    }
  }

/**** activatePendingScriptOfMaster ****/

  export function activatePendingScriptOfMaster (Name:WAT_Name):void {
    let MasterInfo = existingInfoForMaster(Name)

    MasterInfo.ErrorInfo = undefined
      compileScriptIntoMaster(MasterInfo.pendingScript,MasterInfo)   // may fail!
    if (MasterInfo.ErrorInfo == null) {
      MasterInfo.Script = MasterInfo.pendingScript
      delete MasterInfo.pendingScript
      ;(MasterInfo.Version as WAT_Version).Build = currentTimestamp()

      refreshInstancesOfMaster(Name)
    } else {
      MasterInfo.ErrorInfo  = undefined
      compileScriptIntoMaster(MasterInfo.Script,MasterInfo)

      if (MasterInfo.ErrorInfo != null) {
        refreshInstancesOfMaster(Name)
      }
    }
  }

/**** PropertiesOfMaster ****/

  export function PropertiesOfMaster (Name:WAT_Name):WAT_Property[] {
    let MasterInfo = existingInfoForMaster(Name)

    let Result = []
      let Properties = MasterInfo.Properties
      if (Properties != null) {
        for (let i = 0, l = Properties.length; i < l; i++) {
          Result.push(Object.assign({},Properties[i]))
        }
      }
    return Result
  }

/**** PropertyNamesOfMaster ****/

  export function PropertyNamesOfMaster (Name:WAT_Name):WAT_Identifier[] {
    let MasterInfo = existingInfoForMaster(Name)

    let Result = []
      let Properties = MasterInfo.Properties
      if (Properties != null) {
        for (let i = 0, l = Properties.length; i < l; i++) {
          Result.push(Properties[i].Identifier)
        }
      }
    return Result
  }

/**** PropertyOfMaster ****/

  export function PropertyOfMaster (
    Name:WAT_Name, Identifier:WAT_Identifier
  ):WAT_Property | undefined {
//  expectName       ('master name',Name)   // t.b.d. by "existingInfoForMaster"
    allowIdentifier('property name',Identifier)

    validatePropertyName(Identifier)

    let MasterInfo = existingInfoForMaster(Name)
    let Properties = MasterInfo.Properties
      if (Properties != null) {
        for (let i = 0, l = Properties.length; i < l; i++) {
          let Property = Properties[i]
          if (Property.Identifier === Identifier) {
            return Object.assign({},Property)
          }
        }
      }
    return undefined
  }

/**** MasterHasProperty ****/

  export function MasterHasProperty (
    Name:WAT_Name, Identifier:WAT_Identifier
  ):boolean {
//  expectName       ('master name',Name)   // t.b.d. by "existingInfoForMaster"
    allowIdentifier('property name',Identifier)

    if (Identifier in forbiddenPropertyNames) { return false }

    let MasterInfo = existingInfoForMaster(Name)
    let Properties = MasterInfo.Properties
      if (Properties != null) {
        for (let i = 0, l = Properties.length; i < l; i++) {
          let Property = Properties[i]
          if (Property.Identifier === Identifier) {
            return true
          }
        }
      }
    return false
  }

/**** MasterLacksProperty ****/

  export function MasterLacksProperty (
    Name:WAT_Name, Identifier:WAT_Identifier
  ):boolean {
    return ! MasterHasProperty(Name,Identifier)
  }

/**** insertPropertyOfMasterAt ****/

  export function insertPropertyOfMasterAt (
    Name:WAT_Name, Specification:WAT_Property, Index?:number
  ):void {
//  expectName      ('master name',Name)  // t.b.d. by "IndexOfPropertyOfMaster"
    allowOrdinal('insertion index',Index)

    let Property = expectedProperty('property specification',Specification)

    let Identifier = Property.Identifier
    if (IndexOfPropertyOfMaster(Name,Identifier) >= 0) throwError(
      'PropertyExists: a property with the name ' + quoted(Identifier) + ' exists already'
    )

    let MasterInfo = MasterRegistry[Name]
    let Properties = MasterInfo.Properties
    if (Properties == null) {
      MasterInfo.Properties = [Property]
    } else {
      if (Index == null) {
        Index = Properties.length
      } else {
        Index = Math.min(Index,Properties.length)
      }

      Properties.splice(Index,0, Property)
    }
  }

/**** renamePropertyOfMaster ****/

  export function renamePropertyOfMaster (
    Name:WAT_Name, oldIdentifier:WAT_Identifier, newIdentifier:WAT_Identifier
  ):void {
//  expectName      ('master name',Name)  // t.b.d. by "IndexOfPropertyOfMaster"
    expectIdentifier('old property identifier',oldIdentifier)
    expectIdentifier('new property identifier',newIdentifier)

    validatePropertyName(oldIdentifier)
    validatePropertyName(newIdentifier)

    if (oldIdentifier === newIdentifier) { return }

    let PropertyIndex = IndexOfPropertyOfMaster(Name,oldIdentifier)
    if (PropertyIndex < 0) throwError(
      'NoSuchProperty: a property with the name ' + quoted(oldIdentifier) + ' ' +
      'does not exist'
    )

    if (IndexOfPropertyOfMaster(Name,newIdentifier) >= 0) throwError(
      'PropertyExists: a property with the name ' + quoted(newIdentifier) + ' ' +
      'exists already'
    )

    let Property = (MasterRegistry[Name].Properties as WAT_Property[])[PropertyIndex]
    Property.Identifier = newIdentifier
  }

/**** changePropertyOfMaster ****/

  export function changePropertyOfMaster (
    Name:WAT_Name, Identifier:WAT_Identifier, Specification:WAT_Property
  ):void {
//  expectName      ('master name',Name)                         // t.b.d. below
    expectIdentifier('property identifier',Identifier)

    validatePropertyName(Identifier)

    let Property = expectedProperty('property specification',Specification)
    if (Identifier !== Property.Identifier) {
      renamePropertyOfMaster(Name, Identifier, Property.Identifier)
    }

    let PropertyIndex = IndexOfPropertyOfMaster(Name,Identifier)

    let Properties = MasterRegistry[Name].Properties as WAT_Property[]
    Properties[PropertyIndex] = Property
  }

/**** IndexOfPropertyOfMaster ****/

  export function IndexOfPropertyOfMaster (
    Name:WAT_Name, Identifier:WAT_Identifier
  ):number {
//  expectName        ('master name',Name)  // t.b.d. by "existingInfoForMaster"
    expectIdentifier('property name',Identifier)

    validatePropertyName(Identifier)

    let MasterInfo = existingInfoForMaster(Name)
    let Properties = MasterInfo.Properties
      if (Properties != null) {
        for (let i = 0, l = Properties.length; i < l; i++) {
          if (Properties[i].Identifier === Identifier) {
            return i
          }
        }
      }
    return -1
  }

/**** PropertyCountOfMaster ****/

  export function PropertyCountOfMaster (Name:WAT_Name):number {
//  expectName('master name',Name)          // t.b.d. by "existingInfoForMaster"

    let MasterInfo = existingInfoForMaster(Name)
    let Properties = MasterInfo.Properties
    return (Properties == null ? 0 : Properties.length)
  }

/**** PropertyOfMasterMayBeMovedUp ****/

  export function PropertyOfMasterMayBeMovedUp (
    Name:WAT_Name, Identifier:WAT_Identifier
  ):boolean {
//  expectName        ('master name',Name)// t.b.d. by "IndexOfPropertyOfMaster"
//  expectIdentifier('property name',Identifier)                         // dto.

    let Index = IndexOfPropertyOfMaster(Name,Identifier)
    return (Index > 0)
  }

/**** PropertyOfMasterMayBeMovedDown ****/

  export function PropertyOfMasterMayBeMovedDown (
    Name:WAT_Name, Identifier:WAT_Identifier
  ):boolean {
//  expectName        ('master name',Name)// t.b.d. by "IndexOfPropertyOfMaster"
//  expectIdentifier('property name',Identifier)                         // dto.

    let Index = IndexOfPropertyOfMaster(Name,Identifier)
    return (
      (Index >= 0) &&
      (Index < (MasterRegistry[Name].Properties as WAT_Property[]).length-1)
    )
  }

/**** movePropertyOfMasterToTop ****/

  export function movePropertyOfMasterToTop (
    Name:WAT_Name, Identifier:WAT_Identifier
  ):void {
//  expectName        ('master name',Name)// t.b.d. by "IndexOfPropertyOfMaster"
//  expectIdentifier('property name',Identifier)                         // dto.

    let Index = IndexOfPropertyOfMaster(Name,Identifier)
    if (Index > 0) {
      let Properties = MasterRegistry[Name].Properties as WAT_Property[]
      let Property   = Properties.splice(Index,1)[0]
      Properties.unshift(Property)
    }
  }

/**** movePropertyOfMasterUp ****/

  export function movePropertyOfMasterUp (
    Name:WAT_Name, Identifier:WAT_Identifier
  ):void {
//  expectName        ('master name',Name)// t.b.d. by "IndexOfPropertyOfMaster"
//  expectIdentifier('property name',Identifier)                         // dto.

    let Index = IndexOfPropertyOfMaster(Name,Identifier)
    if (Index > 0) {
      let Properties = MasterRegistry[Name].Properties as WAT_Property[]
      let Property   = Properties.splice(Index,1)[0]
      Properties.splice(Index-1,0, Property)
    }
  }

/**** movePropertyOfMasterDown ****/

  export function movePropertyOfMasterDown (
    Name:WAT_Name, Identifier:WAT_Identifier
  ):void {
//  expectName        ('master name',Name)// t.b.d. by "IndexOfPropertyOfMaster"
//  expectIdentifier('property name',Identifier)                         // dto.

    let Properties = MasterRegistry[Name].Properties as WAT_Property[]

    let Index = IndexOfPropertyOfMaster(Name,Identifier)
    if (Index < Properties.length-1) {
      let Property = Properties.splice(Index,1)[0]
      Properties.splice(Index+1,0, Property)
    }
  }

/**** movePropertyOfMasterToBottom ****/

  export function movePropertyOfMasterToBottom (
    Name:WAT_Name, Identifier:WAT_Identifier
  ):void {
//  expectName        ('master name',Name)// t.b.d. by "IndexOfPropertyOfMaster"
//  expectIdentifier('property name',Identifier)                         // dto.

    let Properties = MasterRegistry[Name].Properties as WAT_Property[]

    let Index = IndexOfPropertyOfMaster(Name,Identifier)
    if (Index < Properties.length-1) {
      let Property = Properties.splice(Index,1)[0]
      Properties.push(Property)
    }
  }

/**** movePropertyOfMasterTo ****/

  export function movePropertyOfMasterTo (
    Name:WAT_Name, Identifier:WAT_Identifier, newIndex:number
  ):void {
//  expectName        ('master name',Name)// t.b.d. by "IndexOfPropertyOfMaster"
//  expectIdentifier('property name',Identifier)                         // dto.
    expectOrdinal  ('property index',newIndex)

    let oldIndex = IndexOfPropertyOfMaster(Name,Identifier)
    if (oldIndex < 0) throwError(
      'NoSuchProperty: a property with the name ' + quoted(Identifier) + ' ' +
      'does not exist'
    )

    if (oldIndex === newIndex) { return }

    let Properties = MasterRegistry[Name].Properties as WAT_Property[]

    let Property = Properties.splice(oldIndex,1)[0]
    Properties.splice(newIndex,0,Property)
  }

/**** removePropertyOfMaster ****/

  export function removePropertyOfMaster (
    Name:WAT_Name, Identifier:WAT_Identifier
  ):void {
//  expectName        ('master name',Name)// t.b.d. by "IndexOfPropertyOfMaster"
//  expectIdentifier('property name',Identifier)                         // dto.

    let Index = IndexOfPropertyOfMaster(Name,Identifier)
    if (Index >= 0) {
      let Properties = MasterRegistry[Name].Properties as WAT_Property[]

      Properties.splice(Index,1)
      if (Properties.length === 0) {
        delete MasterRegistry[Name].Properties
      }
    }
  }

/**** ErrorInfoOfMaster ****/

  export function ErrorInfoOfMaster (Name:WAT_Name):WAT_ErrorInfo | undefined {
    let MasterInfo = existingInfoForMaster(Name)
    return MasterInfo.ErrorInfo
  }

/**** UsageCountOfMaster ****/

  export function UsageCountOfMaster (Name:WAT_Name):number {
    let MasterInfo = existingInfoForMaster(Name)
    return MasterInfo.UsageCount
  }

/**** allMastersInDocument ****/

  function allMastersInDocument ():WAT_Name[] {
    let MasterSet = Object.create(null)
      forEach(
        document.head.querySelectorAll('script[type="application/wat-master"]'),
        (ScriptElement) => {
        try {
          let MasterInfo = MasterInfoFromElement(ScriptElement)
          let MasterName = MasterInfo.Name
          if (ValueIsName(MasterName) && (MasterName in MasterRegistry)) {
            MasterSet[MasterName] = MasterName
          }
        } catch (Signal) { /* nop - has already be reported */ }
      })
    let MasterList:WAT_Name[] = []
      for (let Master in MasterSet) {
        MasterList.push(Master)
      }
    return MasterList
  }

/**** Masters ****/

  export function Masters ():WAT_Name[] {
    let Result = []
      for (let Master in MasterRegistry) {
        Result.push(Master)
      }
    return Result
  }

/**** instantiableMasters - i.e., all without Applet masters ****/

  export function instantiableMasters ():WAT_Name[] {
    let Result = []
      for (let Master in MasterRegistry) {
        let MasterInfo = MasterRegistry[Master]
        if (MasterInfo.Category !== 'Applet') { Result.push(Master) }
      }
    return Result
  }

/**** instantiableLayerMasters ****/

  export function instantiableLayerMasters ():WAT_Name[] {
    let Result = []
      for (let Master in MasterRegistry) {
        let MasterInfo = MasterRegistry[Master]
        if (
          (MasterInfo.Category === 'Card') ||
          (MasterInfo.Category === 'Overlay')
        ) { Result.push(Master) }
      }
    return Result
  }

/**** instantiableComponentMasters ****/

  export function instantiableComponentMasters ():WAT_Name[] {
    let Result = []
      for (let Master in MasterRegistry) {
        let MasterInfo = MasterRegistry[Master]
        if (
          (MasterInfo.Category === 'Control') ||
          (MasterInfo.Category === 'Compound')
        ) { Result.push(Master) }
      }
    return Result
  }

/**** missingMasters ****/

  export function missingMasters ():WAT_Name[] {
    let missingMasterSet = Object.create(null)
      forEach(
        document.body.querySelectorAll('.WAT[data-wat-master]'),
        (Peer) => {
          let Master = data(Peer as HTMLElement,'wat-master')
          if (ValueIsName(Master) && ! (Master in MasterRegistry)) {
            missingMasterSet[Master] = Master
          }
        }
      )
    let missingMasterList = []
      for (let Master in missingMasterSet) {
        missingMasterList.push(Master)
      }
    return missingMasterList
  }

/**** unusedMasters ****/

  export function unusedMasters ():WAT_Name[] {
    let unusedMasterList = []
      for (let Master in MasterRegistry) {
        let MasterInfo = MasterRegistry[Master]
        if (MasterInfo.UsageCount <= 0) {
          unusedMasterList.push(Master)
        }
      }
    return unusedMasterList
  }

/**** MastersUsedByVisuals ****/

  export function MastersUsedByVisuals (
    VisualList:WAT_Visual[], withoutIntrinsics?:'withoutIntrinsics'
  ):WAT_Name[] {
    let MasterSet = Object.create(null)
      function collectMastersUsedByVisual (Visual:WAT_Visual):void {
        MasterSet[Visual.Master] = true

        switch (Visual.Category) {
          case 'Applet':
            (Visual as WAT_Applet).CardList.forEach(
              (Card:WAT_Card) => collectMastersUsedByVisual(Card)
            )
            (Visual as WAT_Applet).OverlayList.forEach(
              (Overlay:WAT_Overlay) => collectMastersUsedByVisual(Overlay)
            )
            break
          case 'Card':
          case 'Overlay':
          case 'Compound':
            (Visual as WAT_Container).ComponentList.forEach(
 // @ts-ignore Components are always Visuals
              (Component:WAT_Component) => collectMastersUsedByVisual(Component)
            )
        }
      }

      VisualList.forEach((Visual:WAT_Visual) => collectMastersUsedByVisual(Visual))
    if (withoutIntrinsics) {
      delete MasterSet.plainApplet
      delete MasterSet.plainCard
      delete MasterSet.plainOverlay
      delete MasterSet.plainControl
      delete MasterSet.plainCompound
    }
    let MasterList:WAT_Name[] = []
      for (let Master in MasterSet) {
        MasterList.push(Master)
      }
    return MasterList
  }

//----------------------------------------------------------------------------//
//                               global Visuals                               //
//----------------------------------------------------------------------------//

/**** globalVisualOfApplet ****/

  function globalVisualOfApplet (
    Applet:WAT_Applet, globalName:WAT_Name
  ):WAT_Visual {
    return (InternalsOfVisual(Applet).globalVisualSet as WAT_KeySet)[globalName]
  }

/**** AppletHasGlobalVisual ****/

  function AppletHasGlobalVisual (
    Applet:WAT_Applet, globalName:WAT_Name
  ):boolean {
    return (globalVisualOfApplet(Applet,globalName) != null)
  }

/**** registerGlobalVisualOfApplet ****/

  function registerGlobalVisualOfApplet (
    Applet:WAT_Applet, Visual:WAT_Visual
  ):void {
    let globalVisualSet = InternalsOfVisual(Applet).globalVisualSet as WAT_KeySet
      let globalName = Visual.Name
      if (globalName in globalVisualSet) {
        throwError(
          'VisualExists: a visual with the global name "' + globalName + '" ' +
          'exists already'
        )
      }
    globalVisualSet[globalName] = Visual
  }

/**** unregisterGlobalVisualOfApplet ****/

  function unregisterGlobalVisualOfApplet (
    Applet:WAT_Applet, Visual:WAT_Visual
  ):void {
    let globalName = Visual.Name
    delete (InternalsOfVisual(Applet).globalVisualSet as WAT_KeySet)[globalName]
  }

//----------------------------------------------------------------------------//
//                            Reactivity Handling                             //
//----------------------------------------------------------------------------//

  type WAT_ReactivityContext = {
    $: (firstArg:any, secondArg?:any, thirdArg?:any) => any,
    setReactiveVariable: (VariableName:string, newValue:any, definitely?:boolean, wasControlValueChange?:'wasControlValueChange') => void,
    clearReactiveVariable: (VariableName:WAT_Identifier) => void,
    unregisterReactiveFunctionsOfVisual: (Visual:WAT_Visual) => void
  }

/**** ReactivityContext ****/

  type VariableSet = { [Key:string]:any }
  type FunctionSet = { [Key:string]:Function }

  function ReactivityContext (Applet:WAT_Applet):WAT_ReactivityContext {
    let FunctionKeySet:WeakMap<Function,string> // every function is associated with a unique key
    let reactiveVariableSet:VariableSet       // set of reactive variables & their current values

    let FunctionStack:Function[] // (reversed) stack of currently running reactive funct.s

    let FunctionVarSet:WeakMap<Function,VariableSet>  // set of reactive var.s already known for a given fct.
    let FunctionVarCount:WeakMap<Function,number>       // # of reactive var.s already known for a given fct.
    let FunctionVarList:WeakMap<Function,string[]>      // list of reactive var.s to be passed upon fct. call
    let VarFunctionSet:{[Key:string]:FunctionSet}     // set of functions interested in a given reactive var.

    let recalculating:boolean                    // are we in the middle of a recalculation?
    let RecalculationError:any              // last error that occurred during recalculation
    let activeVarSet:VariableSet       // set of variables handled during this recalculation
    let pendingFunctionSet:FunctionSet // set of reactive functions yet to be (re)calculated
    let pendingFunctionList:string[]     // sorted list of reactive funct.s to be calculated

  /**** reset ****/

    function reset ():void {
      FunctionKeySet      = new WeakMap()
      reactiveVariableSet = Object.create(null)

      FunctionStack = []

      FunctionVarSet   = new WeakMap()
      FunctionVarCount = new WeakMap()
      FunctionVarList  = new WeakMap()
      VarFunctionSet   = Object.create(null)

      resetCalculation()
    }

  /**** resetCalculation - done AFTER any recalculation ****/

    function resetCalculation ():void {
      recalculating       = false
  //  RecalculationError  = undefined                            // not in here!

      activeVarSet        = Object.create(null)
      pendingFunctionSet  = Object.create(null)
      pendingFunctionList = []
    }

  /**** changedVariables ****/

    function changedVariables ():any {
      return Object.assign(Object.create(null),reactiveVariableSet)
    }

  /**** getReactiveVariable ****/

    function getReactiveVariable (VariableName:string):any {
      if (FunctionStack.length > 0) {
        registerFunctionsForVariable(FunctionStack,VariableName)
      }

      if (VariableName[0] === '#') {
        let globalVisual = globalVisualOfApplet(Applet,VariableName)
        if (globalVisual != null) {
          reactiveVariableSet[VariableName] = globalVisual.Value
        }
      }
      return reactiveVariableSet[VariableName]
    }

  /**** setReactiveVariable ****/

    function setReactiveVariable (
      VariableName:string, newValue:any, definitely:boolean = false,
      wasControlValueChange?:'wasControlValueChange'
    ):void {
      let oldValue = reactiveVariableSet[VariableName]

      let equalValues = ValuesAreEqual(oldValue,newValue)
      if (equalValues && ! definitely) { return }

      if (VariableName in activeVarSet) {
        if (equalValues) {
          return
        } else {
          throwError(
            'CircularDependency: trigger variable "' + VariableName + '" ' +
            'has been changed during an ongoing recalculation'
          )
        }
      }

      reactiveVariableSet[VariableName] = newValue  // before Ctrl.Value is set!
      activeVarSet[VariableName]        = newValue

      if ((VariableName[0] === '#') && ! wasControlValueChange) {
        let globalVisual = globalVisualOfApplet(Applet,VariableName)
        if (globalVisual != null) { globalVisual.Value = newValue }
      }

      extendCalculationBy(VariableName)
      if (! recalculating) {
        recalculate()
        if (RecalculationError != null) {
          throw RecalculationError
        }
      }
    }

  /**** clearReactiveVariable ****/

    function clearReactiveVariable (VariableName:string):any {
      delete reactiveVariableSet[VariableName]
    }

  /**** registerReactiveFunctionOfVisual ****/

    function registerReactiveFunctionOfVisual (
      Visual:WAT_Visual, Handler:Function, VarNames:string = '',
      toBeInvokedOnRegistration:boolean = false
    ):void {
      let FunctionKey = FunctionKeySet.get(Handler)
      if (FunctionKey == null) {
        FunctionKey = newFunctionKey()
        FunctionKeySet.set(Handler,FunctionKey)

        let reactiveFunctionList = InternalsOfVisual(Visual).reactiveFunctionList
        if (reactiveFunctionList == null) {
          InternalsOfVisual(Visual).reactiveFunctionList = [Handler]
        } else {
          reactiveFunctionList.push(Handler)
        }

        FunctionVarSet.set(Handler,Object.create(null))
        FunctionVarCount.set(Handler,0)

        VarNames = VarNames.trim().replace(/\s+/g,' ')
        if (VarNames !== '') {
          let VarNameList = VarNames.split(' ')
          for (let i = 0, l = VarNameList.length; i < l; i++) {
            registerFunctionForVariable(Handler,VarNameList[i])
          }

          if (! toBeInvokedOnRegistration) {
            let VarSet = FunctionVarSet.get(Handler)
              let VarList = []
              for (let VarName in VarSet) {
                VarList.push(VarName)
              }
            FunctionVarList.set(Handler,VarList)

            return
          }
        }
      }

      calculateReactiveFunction(Handler)
    }

  /**** unregisterReactiveFunctionOfVisual ****/

    function unregisterReactiveFunctionOfVisual (
      Visual:WAT_Visual, Handler:Function
    ):void {
      const FunctionKey = FunctionKeySet.get(Handler)
      if (FunctionKey == null) { return }

      let reactiveFunctionList = InternalsOfVisual(Visual).reactiveFunctionList
      if (reactiveFunctionList != null) {
        let Index = reactiveFunctionList.indexOf(Handler)
        if (Index >= 0) { reactiveFunctionList.splice(Index,1) }
      }

      let VarSet = FunctionVarSet.get(Handler)
      for (let VarName in VarSet) {
        let FunctionSet = VarFunctionSet[VarName]
        delete FunctionSet[FunctionKey]

        if (ObjectIsEmpty(FunctionSet)) {
          delete VarFunctionSet[VarName]
        }
      }
    }

  /**** unregisterReactiveFunctionsOfVisual ****/

    function unregisterReactiveFunctionsOfVisual (Visual:WAT_Visual):void {
      let reactiveFunctionList = InternalsOfVisual(Visual).reactiveFunctionList
      if (reactiveFunctionList != null) {
        for (let i = 0, l = reactiveFunctionList.length; i < l; i++) {
          unregisterReactiveFunctionOfVisual(
            Visual, reactiveFunctionList[0]               // this is not a typo!
          )
        }
      }
    }

  /**** registerFunctionForVariable ****/

    function registerFunctionForVariable (Handler:Function, VarName:string):void {
      let VarSet = FunctionVarSet.get(Handler)            // reference, not copy
      if (VarSet == null) throwError('InternalError: unregistered function')

      if (! (VarName in VarSet)) {
        VarSet[VarName] = true
        FunctionVarCount.set(Handler,(FunctionVarCount.get(Handler) || 0)+1)

        let FunctionSet = VarFunctionSet[VarName]
        if (FunctionSet == null) {
          FunctionSet = VarFunctionSet[VarName] = Object.create(null)
        }

        let FunctionKey = FunctionKeySet.get(Handler)
        if (FunctionKey == null) throwError('InternalError: unregistered function')
        FunctionSet[FunctionKey] = Handler
      }
    }

  /**** registerFunctionsForVariable ****/

    function registerFunctionsForVariable (
      HandlerList:Function[], VarName:string
    ):void {
      for (let i = 0, l = HandlerList.length; i < l; i++) {
        registerFunctionForVariable(HandlerList[i],VarName)
      }
    }

  /**** extendCalculationBy ****/

    function extendCalculationBy (VarName:string):void {
      let FunctionSet = VarFunctionSet[VarName]
      if (FunctionSet == null) { return }

      let FunctionSetHasChanged = false
        for (let FunctionKey in FunctionSet) {
          if (! (FunctionKey in pendingFunctionSet)) {
            FunctionSetHasChanged = true
            pendingFunctionSet[FunctionKey] = FunctionSet[FunctionKey]
          }
        }
      if (! FunctionSetHasChanged) { return }

      pendingFunctionList = []
      for (let FunctionKey in pendingFunctionSet) {
        pendingFunctionList.push(FunctionKey)
      }

      pendingFunctionList.sort((FunctionKey_A,FunctionKey_B) => {
        let VarCount_A = FunctionVarCount.get(pendingFunctionSet[FunctionKey_A]) || 0
        let VarCount_B = FunctionVarCount.get(pendingFunctionSet[FunctionKey_B]) || 0

        switch (true) {
          case VarCount_A  <  VarCount_B: return -1
          case VarCount_A === VarCount_B: return  0
          default:                        return  1
        }
      })
    }

  /**** recalculate ****/

    function recalculate ():void {
      recalculating = true
        RecalculationError = undefined

        while (pendingFunctionList.length > 0) {
          let FunctionKey = pendingFunctionList.shift() as string
          let Handler     = pendingFunctionSet[FunctionKey]
            delete pendingFunctionSet[FunctionKey]

          try {
            calculateReactiveFunction(Handler)
          } catch (Signal) {
            console.error(
              'error during automatic recalculation of reactive functions',
              Signal
            )
            RecalculationError = Signal
          }
        }
      resetCalculation()                      // also sets recalculating = false
    }

  /**** calculateReactiveFunction ****/

    function calculateReactiveFunction (Handler:Function):void {
      let reactiveVarSet:VariableSet | undefined = undefined
        let VarList = FunctionVarList.get(Handler)
        if (VarList != null) {
          reactiveVarSet = Object.create(null)
          for (let i = 0, l = VarList.length; i < l; i++) {
            let VarName = VarList[i]
// @ts-ignore how can "reactiveVarSet" be null here?
            reactiveVarSet[VarName] = reactiveVariableSet[VarName]
          }
        }
      FunctionStack.unshift(Handler)
      try {
        Handler(reactiveVarSet)
        FunctionStack.shift()
      } catch (Signal) {
        FunctionStack.shift()
        throw Signal
      }
    }

    function $ (
      Visual:WAT_Visual, firstArg:any, secondArg?:any, thirdArg?:any
    ):any {
      switch (arguments.length-1) {
        case 0:
          throwError('MissingArgument: reactive variable name or function expected')
        case 1:
          if (ValueIsString(firstArg))   { return getReactiveVariable(firstArg) }
          if (ValueIsFunction(firstArg)) { return registerReactiveFunctionOfVisual(Visual, firstArg) }
          break
        case 2:
          if (ValueIsString(firstArg)) {
            return setReactiveVariable(firstArg, secondArg, false)
          }

          if (ValueIsFunction(firstArg)) {
            if (ValueIsBoolean(secondArg)) {
              return (
                secondArg == true
                ? registerReactiveFunctionOfVisual(Visual, firstArg)
                : unregisterReactiveFunctionOfVisual(Visual, firstArg)
              )
            }

            if (ValueIsString(secondArg)) {
              return registerReactiveFunctionOfVisual(Visual, firstArg, secondArg, false)
            }
          }
          break
        case 3:
          if (ValueIsString(firstArg) && ValueIsBoolean(thirdArg)) {
            return setReactiveVariable(firstArg, secondArg, thirdArg)
          }

          if (ValueIsFunction(firstArg) && ValueIsString(secondArg) && ValueIsBoolean(thirdArg)) {
            return registerReactiveFunctionOfVisual(Visual, firstArg, secondArg, thirdArg)
          }
      }

      throwError(
        'InvalidArguments: variable name (with opt. value) or function ' +
        '(with opt. variable names) expected'
      )
    }

    reset()

    return {
      $, setReactiveVariable, clearReactiveVariable, unregisterReactiveFunctionsOfVisual
    }
  }

/**** newFunctionKey ****/

  let KeyCounter = 0

  function newFunctionKey ():string {
    KeyCounter += 1
    return 'BRE-' + KeyCounter
  }

/**** make global visuals "reactive" ****/

  ready(() => {
    on(document.body, 'value-changed', undefined, function (DOMEvent:Event) {
      let Origin = VisualOfElement(DOMEvent.target as HTMLElement)
      if (Origin == null) { return }

      let Name = Origin.Name
      if ((Name || '')[0] === '#') {
        InternalsOfVisual(Origin.Applet).ReactivityContext?.setReactiveVariable(
// @ts-ignore always use "detail"
          Name, DOMEvent.detail[0], false, 'wasControlValueChange'
        )
      }
    })
  })

//----------------------------------------------------------------------------//
//                               Event Handling                               //
//----------------------------------------------------------------------------//

/**** ignore some events while an applet is under design ****/

  function swallowEventWhileInhibited (Event:any):void {
    if (Designer == null) { return }

    let Peer = Event.target.closest('.WAT')
    if (Peer == null) { return }

    let Visual = VisualOfElement(Peer) as WAT_Visual
    if (Visual == null) { return }

    if (Designer.inhibitsEventsFrom(Visual)) {
      Event.stopPropagation()
      Event.preventDefault()
    }
  }

  ready(() => {
    document.body.addEventListener('mousedown',swallowEventWhileInhibited)
    document.body.addEventListener('mousemove',swallowEventWhileInhibited)
    document.body.addEventListener('mouseup',  swallowEventWhileInhibited)

    document.body.addEventListener('mouseenter',swallowEventWhileInhibited)
    document.body.addEventListener('mouseleave',swallowEventWhileInhibited)

    document.body.addEventListener('keydown', swallowEventWhileInhibited)
    document.body.addEventListener('keypress',swallowEventWhileInhibited)
    document.body.addEventListener('keyup',   swallowEventWhileInhibited)

    document.body.addEventListener('input', swallowEventWhileInhibited)
    document.body.addEventListener('change',swallowEventWhileInhibited)
    document.body.addEventListener('click', swallowEventWhileInhibited)
  })

/**** registerEventHandlerForVisual - on([TapPoint,]Event[,Selector],Handler) ****/

  function registerEventHandlerForVisual (
    Visual:WAT_Visual, ...ArgumentList:any[]
  ):void {
    let TapPoint:WAT_Visual | undefined, EventName:string
    let EventSelector:string | undefined, EventHandler:Function
    if (ValueIsString(ArgumentList[0]) && ArgumentList[0].startsWith('@')) {
      let TapPointSelector = (ArgumentList.shift() as string).slice(1), TapElement
      if (TapPointSelector[0] === '.') {
        expectName('tap point master name',TapPointSelector.slice(1))
        TapElement = closestParent(Visual.Peer,'.WAT' + TapPointSelector)
      } else {
        expectUniversalName('tap point name',TapPointSelector)
        TapElement = closestFilteredParent(
          Visual.Peer,'.WAT',
          (Peer:HTMLElement) => (VisualOfElement(Peer).Name === TapPointSelector)
        )
      }
      if (TapElement != null) {
        TapPoint = VisualOfElement(TapElement)
      }
    } else {
      TapPoint = Visual
    }

    EventName     = expectedName('event name',ArgumentList.shift())
    EventSelector = (
      ValueIsString(ArgumentList[0]) ? ArgumentList.shift() as string : undefined
    )
    EventHandler  = expectedFunction('event handler',ArgumentList.shift())

  /**** ignore registration if no matching tap point exists ****/

    if (TapPoint == null) { return }

  /**** provide the "actual" event handler for the configured situation ****/

    let actualHandler = function actualEventHandler (...ArgumentList:any) {
      let Event = ArgumentList[0]

      if ((Designer != null) && Designer.inhibitsEventsFrom(Visual)) {
        Event.stopPropagation()
        Event.preventDefault()
        return
      }                          // no event handling for "applets under design"

      if ((TapPoint === Visual) && (EventSelector == null)) {
        if (Event.target !== Visual.Peer) { return }
      }                         // ignore "inner events" if no selector is given

      EventHandler.apply(Visual,ArgumentList)
    }

  /**** register event handler at tap point ****/

    let Internals     = InternalsForVisual.get(Visual)
    let EventHandlers = Internals.EventHandlers
    if (EventHandlers == null) {
      Internals.EventHandlers = EventHandlers = []
    }

    for (let i = 0, l = EventHandlers.length; i < l; i++) {
      let Candidate = EventHandlers[i]
      if (
        (Candidate.TapPoint  === TapPoint)  && (Candidate.EventSelector === EventSelector) &&
        (Candidate.EventName === EventName) && (Candidate.EventHandler  === EventHandler)
      ) { return }                        // handler has already been registered
    }

    EventHandlers.push({
      TapPoint, EventName, EventSelector, EventHandler, actualHandler
    })                       // n.b.: a missing selector is specified as "null"!

    on(TapPoint.Peer, EventName, EventSelector, actualHandler)
  }

/**** unregisterEventHandlerForVisual - off([TapPoint,]Event[,Selector],Handler) ****/

  function unregisterEventHandlerForVisual (
    Visual:WAT_Visual, ...ArgumentList:any[]
  ) {
    let TapPoint, EventName, EventSelector, EventHandler
    if (ValueIsString(ArgumentList[0]) && ArgumentList[0].startsWith('@')) {
      let TapPointSelector = (ArgumentList.shift() as string).slice(1), TapElement
      if (TapPointSelector[0] === '.') {
        expectName('tap point master name',TapPointSelector.slice(1))
        TapElement = closestParent(Visual.Peer,'.WAT' + TapPointSelector)
      } else {
        expectUniversalName('tap point name',TapPointSelector)
        TapElement = closestFilteredParent(
          Visual.Peer, '.WAT',
          (Peer:HTMLElement) => (VisualOfElement(Peer).Name === TapPointSelector)
        )
      }
      if (TapElement != null) {
        TapPoint = VisualOfElement(TapElement)
      }
    } else {
      TapPoint = Visual
    }

    EventName     = allowedName('event name',ArgumentList.shift())
    EventSelector = (
      ValueIsString(ArgumentList[0]) ? ArgumentList.shift() as string : null
    )
    EventHandler  = allowedFunction('event handler',ArgumentList.shift())

    if (EventHandler == null) {
      if (EventSelector == null) { EventSelector === undefined }
    }                 // important for selection of event handlers to be removed

  /**** perform deregistration ****/

    if (TapPoint == null) { return }

    let Internals     = InternalsForVisual.get(Visual)
    let EventHandlers = Internals.EventHandlers
    if (EventHandlers == null) { return }

    for (let i = EventHandlers.length-1; i >= 0; i--) {
      let Candidate = EventHandlers[i]
      if (
        (Candidate.TapPoint      === TapPoint) &&
        ((EventName    == null) || (Candidate.EventName    === EventName)) &&
        (Candidate.EventSelector === EventSelector) &&  // even for missing ones
        ((EventHandler == null) || (Candidate.EventHandler === EventHandler))
      ) {
        let actualHandler = Candidate.actualHandler

        off(TapPoint.Peer, Candidate.EventName, Candidate.EventSelector, actualHandler)

        EventHandlers.splice(i,1)
      }
    }
    if (EventHandlers.length === 0) { delete Internals.EventHandlers }
  }

/**** unregisterAllEventHandlersForVisual ****/

  function unregisterAllEventHandlersForVisual (Visual:WAT_Visual) {
    let Internals     = InternalsForVisual.get(Visual)
    let EventHandlers = Internals.EventHandlers
    if (EventHandlers == null) { return }

    for (let i = 0, l = EventHandlers.length; i < l; i++) {
      let [TapPoint, EventName, EventSelector, actualHandler] = EventHandlers[i]
      off(TapPoint.Peer, EventName, EventSelector, actualHandler)
    }
    delete Internals.EventHandlers
  }

/**** triggerEventFromVisual - trigger([InjectPoint,]Event[,...]) ****/

  function triggerEventFromVisual (
    Visual:WAT_Visual, ...ArgumentList:any[]
  ) {
    let InjectionPoint
    if (ValueIsString(ArgumentList[0]) && ArgumentList[0].startsWith('@')) {
      let InjectionPointSelector = (ArgumentList.shift() as string).slice(1), InjectionElement
      if (InjectionPointSelector[0] === '.') {
        expectName('injection point master name',InjectionPointSelector.slice(1))
        InjectionElement = closestParent(Visual.Peer,'.WAT' + InjectionPointSelector)
      } else {
        expectUniversalName('injection point name',InjectionPointSelector)

        InjectionElement = closestFilteredParent(
          Visual.Peer, '.WAT',
          (Peer:HTMLElement) => (VisualOfElement(Peer).Name === InjectionPointSelector)
        )
      }
      if (InjectionElement != null) {
        InjectionPoint = VisualOfElement(InjectionElement)
      }
    } else {
      InjectionPoint = Visual
    }

    if (InjectionPoint != null) {
      let EventName = ArgumentList.shift()
      trigger(InjectionPoint.Peer, EventName,ArgumentList)
    }
  }

//----------------------------------------------------------------------------//
//                               Error Handling                               //
//----------------------------------------------------------------------------//

  export type WAT_ErrorInfo = {
    Title:       string,                    // used as heading for error display
    longMessage: string,                               // used for error display
    shortMessage:string,                   // used by Designer in MessageDisplay
    Reason?:     string,                    // internal (technical) error report

    Applet:   WAT_Applet,                  // applet containing faulty component
    Sufferer: WAT_Name|WAT_Visual, // name of affected master or affected visual
    Property?:WAT_Identifier      // optional: affected property (e.g. "Script")
  }

/**** [set]ErrorInfoOfVisual ****/

  function ErrorInfoOfVisual (Visual:WAT_Visual):WAT_ErrorInfo | undefined {
    return InternalsOfVisual(Visual).ErrorInfo
  }

  function setErrorInfoOfVisual (
    Visual:WAT_Visual, newErrorInfo?:WAT_ErrorInfo
  ) {
    let Internals = InternalsOfVisual(Visual)
    if (newErrorInfo == null) {
      delete Internals.ErrorInfo
      remove(filtered(Internals.Peer.children,'.WAT-ErrorIndicator'))
    } else {
      if (Internals.ErrorInfo == null) {    // don't overwrite an existing error
        Internals.ErrorInfo = newErrorInfo
        remove(filtered(Internals.Peer.children,'.WAT-ErrorIndicator'))
        Internals.Peer.appendChild(
          ElementFromHTML('<button class="WAT-ErrorIndicator"></button>')
        )
      }
    }
  }

/**** install event handler for Error Indicators ****/

  function installEventHandlerForErrorIndicators () {
    off(document, 'click','.WAT-ErrorIndicator')
    on (document, 'click','.WAT-ErrorIndicator', function (DOMEvent:Event) {
      let ErrorIndicator = DOMEvent.target as HTMLElement
      let affectedVisual = VisualOfElement(ErrorIndicator?.closest('.WAT'))
      if (affectedVisual == null) {
        alert('WAT Error\n\nCould not find Visual for this Error Indicator')
        return
      }

      let ErrorInfo = ErrorInfoOfVisual(affectedVisual)
      if (ErrorInfo != null) {
        if ((Designer != null) && affectedVisual.Applet.mayBeDesigned) {
          if (window.confirm(
            ErrorInfo.Title + '\n\n' + ErrorInfo.longMessage +
            (ErrorInfo.Reason != null ? '\n\nReason:\n' + ErrorInfo.Reason : '') +
            '\n\nDo you want to proceed to the Designer?'
          )) {
            Designer.startDesigning(
              affectedVisual.Applet, ErrorInfo.Sufferer, ErrorInfo.Property
            )
          }
        } else {
          window.alert(
            ErrorInfo.Title + '\n\n' + ErrorInfo.longMessage +
            (ErrorInfo.Reason != null ? '\n\nReason:\n' + ErrorInfo.Reason : '')
          )
        }
      }
    })
  }

/**** firstAppletInDocument (used for errors in masters) ****/

  function firstAppletInDocument ():WAT_Applet {
    let firstAppletPeer = AppletPeersInDocument()[0]
    return VisualOfElement(firstAppletPeer) as WAT_Applet
  }

/**** VisualWithUniqueId ****/

  const VisualRegistry = Object.create(null)

  function VisualWithUniqueId (uniqueId:number):WAT_Visual {
    expectOrdinal('unique visual id',uniqueId)
    return VisualRegistry[uniqueId]
  }

/**** VisualOfElement (internal function w/o validation) ****/

  const VisualForDOMElement = new WeakMap()             // DOM element -> visual

  function VisualOfElement (Element:HTMLElement | null):WAT_Visual {
    return (Element == null ? undefined : VisualForDOMElement.get(Element))
  }

/**** VisualForElement (public version w/ validation) ****/

  export function VisualForElement (Element:HTMLElement):WAT_Visual {
    expectElement('element',Element)

    let Candidate = VisualForDOMElement.get(Element)
    if (Candidate != null) { return Candidate }

    Candidate = Element.closest('.WAT')
    return (Candidate == null ? undefined : VisualForDOMElement.get(Candidate))
  }

/**** InternalsOfVisual ****/

  type WAT_Internals = {
    uniqueId:number,                              // internally unique visual id
    Peer:HTMLElement,                                      // mandatory property
    State?:any,                  // opt. custom state, must be JSON-serializable
    EventHandlers?:any,    // list of event handlers registered from this visual
    reactiveFunctionList?:Function[],              // list of reactive functions
    globalVisualSet?:{ [Name:string]:WAT_Visual },           // for applets only
    ReactivityContext?:WAT_ReactivityContext,                            // dto.
    BackupStatus?:'isBeingPreserved'|'isBeingRestored'|'isBeingRemoved', // dto.
    ErrorInfo?:WAT_ErrorInfo, pendingScriptError?:WAT_ErrorInfo
  }

  const InternalsForVisual = new WeakMap()                // visual -> internals

  function InternalsOfVisual (Visual:WAT_Visual):WAT_Internals {
    return InternalsForVisual.get(Visual)
  }

/**** PeerOfVisual ****/

  function PeerOfVisual (Visual:WAT_Visual):HTMLElement {
    return InternalsForVisual.get(Visual).Peer
  }

/**** AppletOfPeer ****/

  function AppletOfPeer (Peer:HTMLElement):WAT_Applet | undefined {
    let Candidate = Peer.closest('.WAT.Applet')
    return (Candidate == null ? undefined : VisualOfElement(Candidate as HTMLElement) as WAT_Applet)
  }

/**** CategoryOfPeer ****/

  function CategoryOfPeer (
    Peer:HTMLElement, DefaultCategory?:WAT_Category|'Layer'|'Component'
  ):WAT_Category {
    switch (true) {
      case Peer.classList.contains('Applet'):   return 'Applet'
      case Peer.classList.contains('Card'):     return 'Card'
      case Peer.classList.contains('Overlay'):  return 'Overlay'
      case Peer.classList.contains('Control'):  return 'Control'
      case Peer.classList.contains('Compound'): return 'Compound'
      default: switch (DefaultCategory) {
        case 'Applet':    return 'Applet'
        case 'Layer':     return 'Card'
        case 'Card':      return 'Card'
        case 'Overlay':   return 'Overlay'
        case 'Component': return (
          filtered(Peer.children,'.WAT.Control,.WAT.Compound').length > 0
          ? 'Compound'
          : 'Control'
        )
        case 'Control':  return 'Control'
        case 'Compound': return 'Compound'
        default: throwError(
          'BrokenVisual: cannot determine category of given visual'
        )
      }
    }
  }

/**** VersionOfPeer ****/

  function VersionOfPeer (Peer:HTMLElement):WAT_Version|undefined {
    let Candidate = data(Peer,'wat-master-version')
    return (ValueIsSemVer(Candidate) ? parsedVersion(Candidate) : undefined)
  }

/**** MasterOfPeer ****/

  function MasterOfPeer (Peer:HTMLElement, Category?:WAT_Category):WAT_Name {
    let Candidate = data(Peer,'wat-master')
    if (ValueIsName(Candidate)) {
      return Candidate
    } else {
      return (Category == null ? 'plainVisual' : 'plain'+Category)
    }
  }

/**** NameOfPeer ****/

  function NameOfPeer (Peer:HTMLElement):WAT_Name {
    let Candidate = data(Peer,'wat-name')
    return (ValueIsUniversalName(Candidate) ? Candidate : undefined)
  }

/**** ScriptOfPeer ****/

  function ScriptOfPeer (Peer:HTMLElement):string {
    let Candidate = data(Peer,'wat-script')
    return (ValueIsText(Candidate) ? Candidate : undefined)
  }

/**** StateOfPeer ****/

  function StateOfPeer (Peer:HTMLElement):any {
    let Candidate = data(Peer,'wat-state')
    if (Candidate == null) { return null }

    try {
      return JSON.parse(Candidate)
    } catch (Signal) {
      return null
    }
  }

/**** VisualBuiltFromPeer - extremely forgiving (not to break an applet) ****/

  function VisualBuiltFromPeer (
    Peer:HTMLElement, allowedCategory:WAT_Category|'Layer'|'Component'
  ):WAT_Visual {
    let Category = CategoryOfPeer(Peer,allowedCategory)
    if (CategoryContradictsExpectation(Category,allowedCategory)) {
      let originalCategory = Category
        switch (allowedCategory) {
          case 'Layer':     Category = 'Card'; break
          case 'Component': Category = (
            filtered(Peer.children,'.WAT.Control,.WAT.Compound').length > 0
            ? 'Compound'
            : 'Control'
          )
          default: Category = allowedCategory
        }

        let Visual = VisualOfCategory(Category,Peer)
        let Applet = AppletOfPeer(Peer)
        if (Applet != null) {
          setErrorInfoOfVisual(Visual,{
            Title:       'Inappropriate Category',
            longMessage: 'This visual belongs to category ' +
                         quoted(originalCategory) + ', which is not allowed here',
            shortMessage:'inappropriate category ' + quoted(originalCategory),
            Applet:      Applet,
            Sufferer:    Visual,
            Property:    'Category'
          })

          buildInnerVisuals()
        }
      return Visual
    }

    function buildInnerVisuals ():void {
      switch (Category) {
        case 'Applet':
          filtered(Peer.children,'.WAT.Card,.WAT.Overlay').forEach((Peer) => {
            buildVisualFromPeer(Peer as HTMLElement,'Layer')
          })
          break
        case 'Card':
        case 'Overlay':
        case 'Compound':
          filtered(Peer.children,'.WAT.Control,.WAT.Compound').forEach((Peer) => {
            buildVisualFromPeer(Peer as HTMLElement,'Component')
          })
      }
    }

    let Visual = VisualOfCategory(Category,Peer)
    let Applet = AppletOfPeer(Peer)
    if (Applet != null) {
      let Master     = MasterOfPeer(Peer,Category)
      let MasterInfo = MasterRegistry[Master]
      if (MasterInfo == null) {
        setErrorInfoOfVisual(Visual,{
          Title:       'No such Master',
          longMessage: 'A visual master called ' + quoted(Master) + ' is not ' +
                       'available',
          shortMessage:'unknown master ' + quoted(Master),
          Applet:      Applet,
          Sufferer:    Visual,
          Property:    'Master'
        })
          buildInnerVisuals()
        return Visual
      }

      let Classes = MasterInfo.Classes
      if (Classes != null) {
        Classes.forEach((Class) => { Peer.classList.add(Class) })
      }

      if (MasterInfo.Category !== Category) {
        setErrorInfoOfVisual(Visual,{
          Title:       'Inappropriate Master',
          longMessage: 'Master ' + quoted(Master) + ' is not foreseen for ' +
                       'category ' + quoted(Category),
          shortMessage:'inappropriate master ' + quoted(Master),
          Applet:      Applet,
          Sufferer:    Visual,
          Property:    'Master'
        })
          buildInnerVisuals()
        return Visual
      }

      let Version = VersionOfPeer(Peer)
      if ((Version != null) && ! VersionAmatchesB(Version,MasterInfo.Version as WAT_normalizedVersion)) {
        setErrorInfoOfVisual(Visual,{
          Title:       'Inappropriate Version',
          longMessage: 'This visual requires a different version of master ' +
                       quoted(Master) + ' than available',
          shortMessage:'inappropriate master ' + quoted(Master),
          Applet:      Applet,
          Sufferer:    Visual,
          Property:    'Version'
        })
          buildInnerVisuals()
        return Visual
      }

      if (MasterInfo.ErrorInfo != null) {
        setErrorInfoOfVisual(Visual,MasterInfo.ErrorInfo)
          buildInnerVisuals()
        return Visual
      }

      if (Category === 'Applet') {// every applet must always contain >= 1 cards
        if (filtered(Peer.children,'.WAT.Card').length === 0) {
          Peer.insertBefore(ElementFromHTML(
            '<div class="WAT Card" data-wat-master="plainCard" style="visibility:visible"></div>'
          ), Peer.firstChild)
        }
      }

      let Name = NameOfPeer(Peer)
      if ((Name != null) && (Name[0] === '#')) {
        try {
          registerGlobalVisualOfApplet(Applet,Visual)
        } catch (Signal) {
          setErrorInfoOfVisual(Visual,{
            Title:       'Global name Collision',
            longMessage: 'The global name of this visual ' + quoted(Name) + ' ' +
                         'has already been used',
            shortMessage:'global name collision ' + quoted(Name),
            Applet:      Applet,
            Sufferer:    Visual,
            Property:    'Name'
          })
            buildInnerVisuals()
          return Visual
        }
      }

      let State = StateOfPeer(Peer)
      if (State != null) {
        InternalsOfVisual(Visual).State = State
      }

      let VisualScript = ScriptOfPeer(Peer)
      if ((MasterInfo.compiledScript != null) || (VisualScript != null)) {
        const toGet   = definePropertyGetterForVisual.bind(null,Visual)
        const toSet   = definePropertySetterForVisual.bind(null,Visual)
        const on      = registerEventHandlerForVisual.bind(null,Visual)
        const off     = unregisterEventHandlerForVisual.bind(null,Visual)
        const trigger = triggerEventFromVisual.bind(null,Visual)

        const Reactivity = (...ArgumentList:any[]):any => {
          ArgumentList.unshift(Visual)
          return InternalsOfVisual(Applet as WAT_Applet).ReactivityContext?.$.apply(
// @ts-ignore don't worry about number of arguments
            null,ArgumentList          // since number of arguments is important
          )
        }

        if (MasterInfo.compiledScript != null) {
          try {
            MasterInfo.compiledScript.call(Visual, toGet,toSet,on,off,trigger,Reactivity)
          } catch (Signal) {
            setErrorInfoOfVisual(Visual,{
              Title:       'Execution Error in Master Script',
              longMessage: 'The script of master ' + quoted(Master) + ' could ' +
                           'not be applied to this visual',
              shortMessage:Signal.message,
              Reason:      Signal,
              Applet:      Applet,
              Sufferer:    Visual,
              Property:    'Master'
            })
              buildInnerVisuals()
            return Visual
          }
        }

        let compiledScript
        if (VisualScript != null) {
          try {
            compiledScript = new Function(
              'toGet','toSet','on','off','trigger','$', VisualScript
            )
          } catch (Signal) {
            setErrorInfoOfVisual(Visual,{
              Title:       'Compilation Error',
              longMessage: 'The script of this visual could not be compiled',
              shortMessage:Signal.message,
              Reason:      Signal,
              Applet:      Applet,
              Sufferer:    Visual,
              Property:    'Script'
            })
              buildInnerVisuals()
            return Visual
          }

          try {
            compiledScript.call(Visual, toGet,toSet,on,off,trigger,Reactivity)
          } catch (Signal) {
            setErrorInfoOfVisual(Visual,{
              Title:       'Execution Error in Visual Script',
              longMessage: 'The script of this visual failed',
              shortMessage:Signal.message,
              Reason:      Signal,
              Applet:      Applet,
              Sufferer:    Visual,
              Property:    'Script'
            })
              buildInnerVisuals()
            return Visual
          }
        }
      }

      buildInnerVisuals()
    }

    return Visual
  }

/**** buildVisualFromPeer ****/

  function buildVisualFromPeer (
    Peer:HTMLElement, allowedCategory:WAT_Category|'Layer'|'Component'
  ):void {
    VisualBuiltFromPeer(Peer,allowedCategory)
  }

/**** VisualOfCategory - for creating new or refreshing existing visuals ****/

  let uniqueIdCounter = 0

  function VisualOfCategory (
    Category:WAT_Category, Peer:HTMLElement
  ):WAT_Visual {
    let uniqueId
      let oldVisual = VisualForDOMElement.get(Peer)
      if (oldVisual == null) {                                // deserialization
        let serializedId = attr(Peer,'data-wat-unique-id')
        if (serializedId != null) {
          let newId = parseInt(serializedId,10)
          if (
            ValueIsOrdinal(newId) &&
            (newId < uniqueIdCounter) &&
            (VisualRegistry[newId] == null)
          ) { uniqueId = newId }

          attr(Peer,'data-wat-unique-id',undefined)
        }
      } else {                                                        // refresh
        uniqueId = InternalsForVisual.get(oldVisual).uniqueId
      }
    if (uniqueId == null) { uniqueId = newUniqueId() }

    let newVisual:WAT_Visual
      switch (Category) {
        case 'Applet':   newVisual = new WAT_Applet();   break
        case 'Card':     newVisual = new WAT_Card();     break
        case 'Overlay':  newVisual = new WAT_Overlay();  break
        case 'Control':  newVisual = new WAT_Control();  break
        case 'Compound': newVisual = new WAT_Compound(); break
        default: throwError('InternalError: unforeseen visual category')
      }
      VisualForDOMElement.set(Peer,newVisual)
      VisualRegistry[uniqueId] = newVisual

      Peer.classList.add('WAT',Category)

      InternalsForVisual.set(newVisual,{ uniqueId, Peer })
      if (Category === 'Applet') {
        let Internals = InternalsForVisual.get(newVisual)
        Internals.globalVisualSet   = Object.create(null)
        Internals.ReactivityContext = ReactivityContext(newVisual as WAT_Applet)
      }
    return newVisual
  }

/**** newUniqueId ****/

  export function newUniqueId ():number {
    return ++uniqueIdCounter
  }

/**** CategoryContradictsExpectation ****/

  function CategoryContradictsExpectation (
    Category:WAT_Category, allowedCategory:WAT_Category|'Layer'|'Component'
  ):boolean {
    switch (allowedCategory) {
      case 'Applet':    return (Category !== 'Applet')
      case 'Layer':     return (Category !== 'Card')    && (Category !== 'Overlay')
      case 'Card':      return (Category !== 'Card')
      case 'Overlay':   return (Category !== 'Overlay')
      case 'Component': return (Category !== 'Control') && (Category !== 'Compound')
      case 'Control':   return (Category !== 'Control')
      case 'Compound':  return (Category !== 'Compound')
      default: throwError('InternalError: unforeseen visual category')
    }
  }

/**** applyStyleToVisual ****/

  function applyStyleToVisual (
    Visual:WAT_Visual, StyleName:string, StyleValue:any
  ):void {
    let MasterInfo = MasterRegistry[Visual.Master]
    if ((MasterInfo?.Styles != null) && (StyleName in MasterInfo.Styles)) {
      let MasterStyle = MasterInfo.Styles[StyleName]
      if (MasterStyle === 'initial') {
        return
      } else {
        StyleValue = MasterStyle
      }
    }
    css(PeerOfVisual(Visual),StyleName,StyleValue)
  }

/**** applyStylesToVisual ****/

  function applyStylesToVisual (
    Visual:WAT_Visual, StyleSet:WAT_StyleSet
  ):void {
    let newStyleSet:{ [Key:string]:string } | undefined = undefined
      let MasterInfo = MasterRegistry[Visual.Master]
      if (MasterInfo?.Styles == null) {
        for (let StyleName in StyleSet) {
          if (
            StyleSet.hasOwnProperty(StyleName) &&
            (StyleSet[StyleName] !== null)
          ) {
            if (newStyleSet == null) { newStyleSet = {} }
            newStyleSet[StyleName] = StyleSet[StyleName] as string
          }
        }
      } else {
        const MasterStyles = MasterInfo.Styles
        for (let StyleName in StyleSet) {
          if (StyleSet.hasOwnProperty(StyleName) && ! (StyleName in MasterStyles)) {
            if (newStyleSet == null) { newStyleSet = {} }
            newStyleSet[StyleName] = StyleSet[StyleName] as string
          }
        }
      }
    if (newStyleSet != null) {
      for (let StyleName in newStyleSet) {
        if (newStyleSet.hasOwnProperty(StyleName)) {
          css(PeerOfVisual(Visual),StyleName,newStyleSet[StyleName])
        }
      }
    }
  }

/**** refreshVisual ****/

  function refreshVisual (Visual:WAT_Visual, oldMaster?:WAT_Name):void {
    let Peer = Visual.Peer          // Peer remains the same, but Visual changes
      let newMaster:WAT_Name
      if (oldMaster != null) {
        newMaster = MasterOfPeer(Peer)        // new Visual will use this master
        data(Peer,'wat-master',oldMaster) // but the current one still uses this
      }

      Visual.trigger('prepare-refresh')        // still using the current master
      releaseVisual(Visual)                                  // NOT recursively!
    buildVisualFromPeer(Peer,Visual.Category)                      // may throw!
  }

/**** releaseVisual ****/

  function releaseVisual (Visual:WAT_Visual, recursively?:'recursively'):void {
    unregisterAllEventHandlersForVisual(Visual)

    let uniqueId = Visual.uniqueId
    if (ValueIsOrdinal(uniqueId)) {
      delete VisualRegistry[uniqueId]     // n.b.: "Internals.uniqueId" remains!
    }                           // (i.e.: after "refresh", uniqueId is restored)

    let Name = Visual.Name
    if ((Name != null) && (Name[0] === '#')) {
      unregisterGlobalVisualOfApplet(Visual.Applet,Visual)
    }

    InternalsOfVisual(Visual.Applet).ReactivityContext
      ?.unregisterReactiveFunctionsOfVisual(Visual)

    if (recursively) {
      filtered(Visual.Peer.children,'.WAT.Card,.WAT.Overlay,.WAT.Compound,.WAT.Control').forEach(
        (Peer) => { releaseVisual(VisualOfElement(Peer as HTMLElement),recursively) }
      )
    }
  }

//----------------------------------------------------------------------------//
//                                 WAT_Visual                                 //
//----------------------------------------------------------------------------//

  export abstract class WAT_Visual {
  /**** uniqueId ****/

    get uniqueId () { return InternalsOfVisual(this).uniqueId }

    set uniqueId (newId:number) {
      expectOrdinal('new unique id',newId)

      let uniqueId = InternalsOfVisual(this).uniqueId
      switch (true) {
        case (newId === uniqueId):
          return
        case (newId > uniqueIdCounter): throwError(
          'InvalidArgument: forbidden id value given'
        )
        case (VisualRegistry[newId] != null): throwError(
          'InvalidArgument: the given id is not unique'
        )
      }

      delete VisualRegistry[uniqueId]
      VisualRegistry[newId] = this

      InternalsOfVisual(this).uniqueId = newId
    }

  /**** Peer ****/

    get Peer () { return InternalsOfVisual(this).Peer }
    set Peer (newPeer:any) { throwReadOnlyError('Peer') }

  /**** isAttached ****/

    get isAttached () {
      return document.body.contains( InternalsOfVisual(this).Peer )
    }

    set isAttached (newAttachment:any) { throwReadOnlyError('isAttached') }

  /**** Id ****/

    get Id () {
      let Candidate = attr(PeerOfVisual(this),'id')
      return (ValueIsId(Candidate) ? Candidate : undefined)
    }

    set Id (newId:string | undefined) {
      allowId('id',newId)

      let Peer = PeerOfVisual(this)

      let oldId = attr(Peer,'id')
      if (newId == oldId) { return }

      if (newId == null) {
        attr(Peer,'id',undefined)
      } else {
        if (document.getElementById(newId) == null) {
          attr(Peer,'id',newId)
        } else {
          throwError('InvalidArgument: the given HTML id is not unique')
        }
      }
    }

  /**** Name ****/

    get Name () {
      let Candidate = data(PeerOfVisual(this),'wat-name')
      return (ValueIsUniversalName(Candidate) ? Candidate : undefined)
    }

    set Name (newName:string) {
      allowUniversalName('name',newName)

      let Peer = PeerOfVisual(this)

      let oldName = data(Peer,'wat-name')
      if (newName == oldName) { return }

      let Applet = this.Applet

      if (oldName.startsWith('#')) {
        unregisterGlobalVisualOfApplet(Applet,oldName)
        InternalsOfVisual(this.Applet)?.ReactivityContext
          ?.clearReactiveVariable(oldName)
      }

      data(Peer,'wat-name',newName || undefined)
      if (newName.startsWith('#')) {
        registerGlobalVisualOfApplet(Applet,this)
        InternalsOfVisual(this.Applet)?.ReactivityContext
          ?.setReactiveVariable(newName,this.Value)
      }
    }

  /**** Label ****/

    get Label () {
      let Candidate = data(PeerOfVisual(this),'wat-label')
      return (ValueIsLabel(Candidate) ? Candidate : undefined)
    }

    set Label (newLabel:WAT_Label) {
      allowLabel('label',newLabel)
      data(PeerOfVisual(this),'wat-label',newLabel || undefined)
    }

  /**** Category ****/

    get Category () {
      let Peer = PeerOfVisual(this)
      switch (true) {
        case Peer.classList.contains('Applet'):   return 'Applet'
        case Peer.classList.contains('Card'):     return 'Card'
        case Peer.classList.contains('Overlay'):  return 'Overlay'
        case Peer.classList.contains('Control'):  return 'Control'
        case Peer.classList.contains('Compound'): return 'Compound'
        default: throwError(
          'BrokenVisual: cannot determine category of given visual'
        )
      }
    }
    set Category (newCategory:any) { throwReadOnlyError('Category') }

  /**** Master ****/

    get Master () {
      let Peer = PeerOfVisual(this)

      let Master = data(Peer,'wat-master')
      if (ValueIsName(Master)) {
        return Master             // independent of whether master exists or not
      } else {
        throwError('InvalidVisual: the given visual does not have a master')
      }
    }
    set Master (newMaster:any) {
      allowName('master',newMaster)

      if (newMaster == null) {
        newMaster = 'plain' + this.Category
      } else {
        let MasterInfo = MasterRegistry[newMaster]
        if ((MasterInfo != null) && (MasterInfo.Category !== this.Category)) throwError(
          'InvalidArgument: the given master is not made for visuals of type ' +
          quoted(this.Category)
        )
      }

      let Peer = PeerOfVisual(this)

      let oldMaster = data(Peer,'wat-master')
      if (newMaster == oldMaster) { return }

      data(Peer,'wat-master',newMaster)
      refreshVisual(this)
    }

  /**** ErrorInfo ****/

    get ErrorInfo () { return ErrorInfoOfVisual(this) }
    set ErrorInfo (newErrorInfo:any) { throwReadOnlyError('ErrorInfo') }

  /**** Container ****/

    get Container () {
      let ContainerPeer = closestParent(
        PeerOfVisual(this), '.WAT.Card,.WAT.Overlay,.WAT.Compound'
      )
      return (
        ContainerPeer == null
        ? undefined
        : VisualOfElement(ContainerPeer)
      )
    }
    set Container (newContainer:any) { throwReadOnlyError('Container') }

  /**** Layer ****/

    get Layer () {
      let LayerPeer = PeerOfVisual(this).closest('.WAT.Card,.WAT.Overlay') // no typo!
      return (
        LayerPeer == null
        ? undefined
        : VisualOfElement(LayerPeer as HTMLElement)
      )
    }
    set Layer (newLayer:any) { throwReadOnlyError('Layer') }

  /**** Applet ****/

    get Applet () {
      let AppletPeer = PeerOfVisual(this).closest('.WAT.Applet')     // no typo!
      return (
        AppletPeer == null
        ? undefined
        : VisualOfElement(AppletPeer as HTMLElement)
      )
    }
    set Applet (newApplet:any) { throwReadOnlyError('Applet') }

  /**** mayBeDesigned ****/

    get mayBeDesigned () {
      return (data(this.Peer,'wat-designability') !== 'false')
    }

    set mayBeDesigned (newDesignability:boolean) {
      expectBoolean('designability',newDesignability)
      data(
        this.Peer, 'wat-designability', newDesignability === false ? 'false' : undefined
      )
    }

  /**** mayBeDeleted ****/

    get mayBeDeleted () {
      return (data(this.Peer,'wat-deletability') !== 'false')
    }

    set mayBeDeleted (newDeletability:boolean) {
      expectBoolean('deletability',newDeletability)
      data(
        this.Peer, 'wat-deletability', newDeletability === false ? 'false' : undefined
      )
    }

  /**** isVisible ****/

    get isVisible () {
      return (css(this.Peer,'visibility') !== 'hidden')
    }

    set isVisible (newVisibility:boolean) {
      expectBoolean('visibility',newVisibility)
      applyStyleToVisual(
        this, 'visibility', newVisibility === true ? 'visible' : 'hidden'
      )
    }

  /**** isShown ****/

    get isShown () {
      let Peer = this.Peer
      if (! document.body.contains(Peer)) { return false }

      while (Peer !== document.body) {
        if (
          (css(Peer,'display')    === 'none') ||
          (css(Peer,'visibility') === 'hidden')
        ) { return false }

        Peer = Peer.parentElement
      }
      return true
    }

    set isShown (newEmergence:any) { throwReadOnlyError('isShown') }

  /**** show/hide ****/

    public show () { this.isVisible = true }
    public hide () { this.isVisible = false }

  /**** isEnabled ****/

    get isEnabled () {
      return ! this.Peer.disabled
    }

    set isEnabled (newEnabling:boolean) {
      expectBoolean('enabling',newEnabling)
      this.Peer.disabled = ! newEnabling
    }

  /**** isDisabled ****/

    get isDisabled () {
      return this.Peer.disabled
    }

    set isDisabled (newDisabling:boolean) {
      expectBoolean('disabling',newDisabling)
      this.Peer.disabled = newDisabling
    }

  /**** enable/disable ****/

    public enable ()  { this.isEnabled = false }
    public disable () { this.isEnabled = true }

  /**** PropertySet ****/

    get PropertySet () {
      let PropertySet = Object.create(null)
        let MasterInfo = MasterRegistry[this.Master]
        if (MasterInfo == null) { return PropertySet }

        let Properties = MasterInfo.Properties
        if (Properties == null) { return PropertySet }

        for (let i = 0, l = Properties.length; i < l; i++) {
          let Property = Properties[i]
          PropertySet[Property.Identifier] = Object.assign(Object.create(null),Property)
          if (Property.ValueList != null) {
            PropertySet[Property.Identifier].ValueList = Property.ValueList.slice()
          }
        }
      return PropertySet
    }

    set PropertySet (newPropertySet:any) { throwReadOnlyError('PropertySet') }

  /**** PropertyMayBeDesigned - a method especially for the Designer ****/

    public PropertyMayBeDesigned (PropertyName:WAT_Identifier):boolean {
      expectIdentifier('property name',PropertyName)

      let MasterInfo = MasterRegistry[this.Master]
      return (
        (MasterInfo?.undesignablePropertySet == null) ||
        ! (PropertyName in MasterInfo.undesignablePropertySet)
      )
    }

  /**** State ****/

    get State () { return InternalsOfVisual(this).State }
    set State (newState:any) {
      if (newState == null) {
        delete InternalsOfVisual(this).State
      } else {
        InternalsOfVisual(this).State = newState
      }
    }

  /**** Value (default implementation, may be overwritten) ****/

    get Value () {
      let State = InternalsOfVisual(this).State
      return (State == null ? undefined : State.Value)
    }

    set Value (newValue:any) {
      let State = InternalsOfVisual(this).State
      if (newValue == null) {
        if (State != null) {
          delete State.Value
        }
      } else {
        if (State == null) {
          State = InternalsOfVisual(this).State = {}
        }
        State.Value = newValue
      }

      this.trigger('value-changed', newValue)// finally also triggers reactivity
    }

  /**** Script ****/

    get Script () { return data(this.Peer,'wat-script') }
    set Script (newScript:any) { throwReadOnlyError('Script') }

  /**** pendingScript ****/

    get pendingScript () { return data(this.Peer,'wat-pending-script') }
    set pendingScript (newPendingScript:WAT_Text) {
      allowText('script',newPendingScript)

      data(
        this.Peer, 'wat-pending-script',
        (newPendingScript || '').trim() === '' ? undefined : newPendingScript
      )
    }

  /**** activatePendingScript ****/

    public activatePendingScript () {
      this.clearPendingScriptError()

      let Internals = InternalsOfVisual(this)

      let pendingScript = this.pendingScript
      if (pendingScript == null) {
        if ((this.Script || '').trim() !== '') {
          data(this.Peer,'wat-script',undefined)
          refreshVisual(this)         // serialization still done by old script!
        }
      } else {
        let pendingScriptError
        try {                       // just compile in order to check for errors
          let compiledScript = new Function(
            'toGet','toSet','on','off','trigger','$', pendingScript
          )
        } catch (Signal) {
          pendingScriptError = {
            Title:       'Compilation Error',
            longMessage: 'pending visual script could not be compiled',
            shortMessage:Signal.message,
            Reason:      Signal,
            Applet:      this.Applet,
            Sufferer:    this,
            Property:    'pendingScript'
          }

          Internals.pendingScriptError = pendingScriptError
        }

        if (pendingScriptError == null) {
          data(this.Peer, 'wat-script',pendingScript)
          data(this.Peer, 'wat-pending-script',undefined)

          refreshVisual(this)         // serialization still done by old script!
        }
      }
    }

  /**** activeScript ****/

    get pendingScriptError () { return InternalsOfVisual(this).pendingScriptError }
    set pendingScriptError (newError:any) { throwReadOnlyError('pendingScriptError') }

  /**** clearPendingScriptError ****/

    public clearPendingScriptError () {
      delete InternalsOfVisual(this).pendingScriptError
    }

  /**** Classes ****/

    get Classes () {
      let ClassNameList = this.Peer.classList.slice()
      return ClassNameList.sort().join(' ')
    }

    set Classes (newClasses:string) {
      allowString('class list',newClasses)  // a better test follows in a moment

      let newClassNameList = newClasses.trim().replace(/\s+/g,' ').split(' ')
        for (let i = 0, l = newClassNameList.length; i < l; i++) {
          let ClassName = newClassNameList[i]
          if (! ValueIsName(ClassName)) {
            throwError('InvalidArgument: invalid class name ' + quoted(ClassName) + ' given')
          }
        }
      let ClassNameSet = KeySetOf(newClassNameList)
        ClassNameSet['WAT'] = true
        ClassNameSet[this.Category] = true

        let MasterInfo = MasterRegistry[this.Master]
        if (MasterInfo?.Classes != null) {
          MasterInfo.Classes.forEach((ClassName) => ClassNameSet[ClassName] = true)
        }
      let ClassNameList = []
        for (let ClassName in ClassNameSet) {
          ClassNameList.push(ClassName)
        }
      this.Peer.className = ClassNameList.join(' ')
    }

  /**** TabIndex ****/

    get TabIndex () {
      let rawValue = attr(this.Peer,'tabindex')
      return (rawValue == null ? undefined : parseInt(rawValue,10))
    }

    set TabIndex (newTabIndex:number | undefined) {
      allowIntegerInRange('tab index',newTabIndex, -1,32767)
      attr(this.Peer, 'tabindex', newTabIndex + '')
    }

  /**** PointerSensitivity ****/

    get PointerSensitivity () {
      return (css(this.Peer,'pointer-events') !== 'none')
    }

    set PointerSensitivity (newPointerSensitivity:boolean) {
      expectBoolean('pointer sensitivity',newPointerSensitivity)

      applyStyleToVisual(this, 'pointer-events', (
        newPointerSensitivity === true ? 'auto' : 'none'
      ))
    }

  /**** Overflows ****/

    get Overflows () {
      function normalizedOverflow (Overflow:string):WAT_Overflow {
        switch (Overflow) {
          case 'visible':  case 'hidden':
          case 'scroll':   case 'auto':
            return Overflow
          case 'clip':
            return 'hidden'
          case 'overlay':
          default:
            return 'auto'
        }
      }

      let Overflows = css(this.Peer,'overflow').split(' ')
        let horizontalOverflow = normalizedOverflow(Overflows[0])
        let verticalOverflow   = normalizedOverflow(Overflows[1] || horizontalOverflow)
      return [horizontalOverflow,verticalOverflow]
    }

    set Overflows (newOverflows:WAT_Overflow[]) {
      allowArray('list of overflow settings',newOverflows)
      if (newOverflows != null) {
        expectOneOf('horizontal overflow',newOverflows[0], WAT_Overflows)
        expectOneOf  ('vertical overflow',newOverflows[1], WAT_Overflows)
      }

      if (newOverflows == null) {
        applyStyleToVisual(this, 'overflow',null)
      } else {
        applyStyleToVisual(this, 'overflow',newOverflows.join(' '))
      }
    }

  /**** TextOverflow ****/

    get TextOverflow () {
      return (css(this.Peer,'text-overflow') === 'clip' ? 'clip' : 'ellipsis')
    }

    set TextOverflow (newTextOverflow:WAT_TextOverflow) {
      allowOneOf('text overflow',newTextOverflow, WAT_TextOverflows)
      applyStyleToVisual(this, 'text-overflow',newTextOverflow)
    }

  /**** Opacity ****/

    get Opacity () {
      return Math.round(100 * parseFloat(css(this.Peer,'opacity')))
    }

    set Opacity (newOpacity:number) {
      allowNumberInRange('opacity',newOpacity, 0,1)
      applyStyleToVisual(this, 'opacity', Math.round(newOpacity) + '%')
    }

  /**** x ****/

    get x () { return GeometryOfVisual(this).x }
    set x (newX:WAT_Location) {
      expectLocation('x coordinate',newX)
      changeGeometryOfVisualTo(this, newX,undefined, undefined,undefined)
    }

  /**** y ****/

    get y () { return GeometryOfVisual(this).y }
    set y (newY:WAT_Location) {
      expectLocation('y coordinate',newY)
      changeGeometryOfVisualTo(this, undefined,newY, undefined,undefined)
    }

  /**** Width ****/

    get Width () { return GeometryOfVisual(this).Width }
    set Width (newWidth:WAT_Dimension) {
      expectDimension('width',newWidth)
      changeGeometryOfVisualTo(this, undefined,undefined, newWidth,undefined)
    }

  /**** Height ****/

    get Height () { return GeometryOfVisual(this).Height }
    set Height (newHeight:WAT_Dimension) {
      expectDimension('height',newHeight)
      changeGeometryOfVisualTo(this, undefined,undefined, undefined,newHeight)
    }

  /**** Position ****/

    get Position () {
      let Geometry = GeometryOfVisual(this)
      return { x:Geometry.x, y:Geometry.y }
    }
    set Position (newPosition:WAT_Position) {
      expectPlainObject('position',newPosition)
        expectLocation('x coordinate',newPosition.x)
        expectLocation('y coordinate',newPosition.y)
      changeGeometryOfVisualTo(this, newPosition.x,newPosition.y, undefined,undefined)
    }

  /**** Size ****/

    get Size () {
      let Geometry = GeometryOfVisual(this)
      return { Width:Geometry.Width, Height:Geometry.Height }
    }
    set Size (newSize:WAT_Size) {
      expectPlainObject('size',newSize)
        expectDimension ('width',newSize.Width)
        expectDimension('height',newSize.Height)
      changeGeometryOfVisualTo(this, undefined,undefined, newSize.Width,newSize.Height)
    }

  /**** Geometry ****/

    get Geometry () { return GeometryOfVisual(this) }
    set Geometry (newGeometry:WAT_Geometry) {
      expectObject('visual geometry',newGeometry)
        expectLocation('x coordinate',newGeometry.x)
        expectLocation('y coordinate',newGeometry.y)
        expectDimension      ('width',newGeometry.Width)
        expectDimension     ('height',newGeometry.Height)
      changeGeometryOfVisualTo(
        this, newGeometry.x,newGeometry.y, newGeometry.Width,newGeometry.Height
      )
    }

  /**** GeometryOnDisplay ****/

    get GeometryOnDisplay () { return GeometryOfVisualOnDisplay(this) }
    set GeometryOnDisplay (newGeometry:any) { throwReadOnlyError('GeometryOnDisplay') }

  /**** horizontalAnchoring ****/

    get horizontalAnchoring () { return horizontalAnchoringOfVisual(this) }
    set horizontalAnchoring (newAnchoring:WAT_horizontalAnchoring) {
      expectOneOf('horizontal anchoring',newAnchoring, WAT_horizontalAnchorings)
      changeHorizontalAnchoringOfVisualTo(this, newAnchoring)
    }

  /**** verticalAnchoring ****/

    get verticalAnchoring () { return verticalAnchoringOfVisual(this) }
    set verticalAnchoring (newAnchoring:WAT_verticalAnchoring) {
      expectOneOf('vertical anchoring',newAnchoring, WAT_verticalAnchorings)
      changeVerticalAnchoringOfVisualTo(this, newAnchoring)
    }

  /**** horizontalOffsets ****/

    get horizontalOffsets () { return horizontalOffsetsOfVisual(this) }
    set horizontalOffsets (newOffsets:WAT_horizontalOffsets) {
      switch (horizontalAnchoringOfVisual(this)) {
        case 'left-width':
          allowLocation  ('"left" offset',newOffsets[0])
          allowDimension('"width" offset',newOffsets[1])
          break
        case 'width-right':
          allowDimension('"width" offset',newOffsets[0])
          allowLocation ('"right" offset',newOffsets[1])
          break
        case 'left-right':
          allowLocation ('"left" offset',newOffsets[0])
          allowLocation('"right" offset',newOffsets[1])
      }

      changeHorizontalOffsetsOfVisualTo(this, newOffsets)
    }

  /**** verticalOffsets ****/

    get verticalOffsets () { return verticalOffsetsOfVisual(this) }
    set verticalOffsets (newOffsets:WAT_verticalOffsets) {
      switch (verticalAnchoringOfVisual(this)) {
        case 'top-height':
          allowLocation    ('"top" offset',newOffsets[0])
          allowDimension('"height" offset',newOffsets[1])
          break
        case 'height-bottom':
          allowDimension('"height" offset',newOffsets[0])
          allowLocation ('"bottom" offset',newOffsets[1])
          break
        case 'top-bottom':
          allowLocation   ('"top" offset',newOffsets[0])
          allowLocation('"bottom" offset',newOffsets[1])
      }

      changeVerticalOffsetsOfVisualTo(this, newOffsets)
    }

  /**** min/maxWidth ****/

    get minWidth () {
      return parseFloat(css(this.Peer,'min-width'))
    }

    set minWidth (newMinimum:WAT_Dimension) {
      allowDimension('minimal width',newMinimum)
      applyStyleToVisual(this, 'min-width', Math.round(newMinimum) + 'px')
    }

    get maxWidth () {
      let maxWidth = css(this.Peer,'max-width')
      return (maxWidth === 'none' ? Infinity : parseFloat(maxWidth))
    }

    set maxWidth (newMaximum:WAT_Dimension) {
      allowDimension('maximal width',newMaximum)
      if (newMaximum === Infinity) {
        applyStyleToVisual(this, 'max-width','none')
      } else {
        applyStyleToVisual(this, 'max-width',Math.round(newMaximum) + 'px')
      }
    }

  /**** min/maxHeight ****/

    get minHeight () {
      return parseFloat(css(this.Peer,'min-height'))
    }

    set minHeight (newMinimum:WAT_Dimension) {
      allowDimension('minimal height',newMinimum)
      applyStyleToVisual(this, 'min-height', Math.round(newMinimum) + 'px')
    }

    get maxHeight () {
      let maxHeight = css(this.Peer,'max-height')
      return (maxHeight === 'none' ? Infinity : parseFloat(maxHeight))
    }

    set maxHeight (newMaximum:WAT_Dimension) {
      allowDimension('maximal height',newMaximum)
      if (newMaximum === Infinity) {
        applyStyleToVisual(this, 'max-height','none')
      } else {
        applyStyleToVisual(this, 'max-height',Math.round(newMaximum) + 'px')
      }
    }

  /**** coversPointOnDisplay ****/

    public coversPointOnDisplay (
      xOnDisplay:WAT_Location, yOnDisplay:WAT_Location
    ):boolean {
      expectLocation('x coordinate',xOnDisplay)
      expectLocation('y coordinate',yOnDisplay)

      let GeometryOnDisplay = this.GeometryOnDisplay
      return (
        (xOnDisplay >= GeometryOnDisplay.x) &&
        (xOnDisplay <  GeometryOnDisplay.x + GeometryOnDisplay.Width) &&
        (yOnDisplay >= GeometryOnDisplay.y) &&
        (yOnDisplay <  GeometryOnDisplay.y + GeometryOnDisplay.Height)
      )
    }

  /**** FontFamily ****/

    get FontFamily () {
      return css(this.Peer,'font-family')
    }

    set FontFamily (newFontFamily:WAT_Textline) {
      allowTextline('font family',newFontFamily)
      applyStyleToVisual(this, 'font-family',newFontFamily)
    }

  /**** FontSize ****/

    get FontSize () {
      return parseFloat(css(this.Peer,'font-size'))
    }

    set FontSize (newFontSize:WAT_Dimension) {
      allowDimension('font size',newFontSize)

      applyStyleToVisual(
        this, 'font-size', newFontSize == null ? null : Math.round(newFontSize) + 'px'
      )
    }

  /**** FontWeight ****/

    get FontWeight () {
      let FontWeight = css(this.Peer,'font-weight')
      switch (FontWeight) {
        case 'lighter':  case 'normal':
        case 'bolder':   case 'bold':
          return FontWeight
        default:
          let BoldnessIndex = Math.max(1, Math.min(9,
            Math.round(parseFloat(FontWeight)/100)
          ))-1
          return WAT_FontWeights[BoldnessIndex]
      }
    }

    set FontWeight (newFontWeight:WAT_FontWeight) {
      allowOneOf('font weight',newFontWeight, WAT_FontWeights)

      switch (newFontWeight) {
        case null: case undefined:
          applyStyleToVisual(this, 'font-weight',null)
          break
        case 'lighter':  case 'normal':
        case 'bolder':   case 'bold':
          applyStyleToVisual(this, 'font-weight',newFontWeight)
          break
        default:
          applyStyleToVisual(
            this, 'font-weight',WAT_FontWeightValues[newFontWeight]
          )
      }
    }

  /**** FontStyle ****/

    get FontStyle () {
      let FontStyle = css(this.Peer,'font-style')
      switch (FontStyle) {
        case 'normal':
        case 'italic':
          return FontStyle
        default:
          return (FontStyle.startsWith('oblique') ? 'italic' : 'normal')
      }
    }

    set FontStyle (newFontStyle:WAT_FontStyle) {
      allowOneOf('font weight',newFontStyle, WAT_FontStyles)
      applyStyleToVisual(this, 'font-style', newFontStyle)
    }

  /**** LineHeight ****/

    get LineHeight () {
      let LineHeight = css(this.Peer,'line-height')
      switch (true) {
        case (LineHeight === 'normal'):
          return Math.round(this.FontSize * 1.5)
        case (LineHeight.indexOf('%') > 0):
          return Math.round(this.FontSize * 100*parseFloat(LineHeight))
        default:
          return parseFloat(LineHeight)
      }
    }

    set LineHeight (newLineHeight:WAT_Dimension) {
      allowDimension('line height',newLineHeight)

      applyStyleToVisual(
        this, 'line-height', newLineHeight == null ? null : Math.round(newLineHeight) + 'px'
      )
    }

  /**** TextDecoration ****/

    get TextDecoration () {
      let {
        textDecorationColor, textDecorationLine, textDecorationStyle,
// @ts-ignore
        textDecorationThickness
      } = window.getComputedStyle(this.Peer)

      if (
        (textDecorationLine === 'none') ||
        ! ValueIsOneOf(textDecorationLine, WAT_TextDecorationLines)
      ) {
        return { Line:'none' }
      } else {
        let Thickness = parseFloat(textDecorationThickness)

        return {
          Line:  textDecorationLine,
          Color: HexColor(textDecorationColor || '#000000'),
          Style: ValueIsOneOf(textDecorationStyle, WAT_TextDecorationStyles) ? textDecorationStyle : 'solid',
          Thickness: isNaN(Thickness) ? 1 : Math.round(Thickness)
        }
      }
    }

    set TextDecoration (newTextDecoration:WAT_TextDecoration) {
      allowPlainObject('text decoration',newTextDecoration)
      if (newTextDecoration != null) {
        expectOneOf       ('text decoration shape',newTextDecoration.Line, WAT_TextDecorationLines)
        allowColor        ('text decoration color',newTextDecoration.Color)
        expectOneOf       ('text decoration style',newTextDecoration.Style, WAT_TextDecorationStyles)
        allowDimension('text decoration thickness',newTextDecoration.Thickness)
      }

      if (newTextDecoration == null) {
        applyStylesToVisual(this, {
          'text-decoration-color':    undefined,
          'text-decoration-line':     undefined,
          'text-decoration-style':    undefined,
          'text-decoration-thickness':undefined
        })
      } else {
        if (newTextDecoration.Line === 'none') {
          applyStyleToVisual(this, 'text-decoration-line','none')
        } else {
          applyStylesToVisual(this, {
            'text-decoration-color': (
              newTextDecoration.Color == null
              ? 'currentColor'
              : shortHexColor(HexColor(newTextDecoration.Color))
            ),
            'text-decoration-line':  newTextDecoration.Line,
            'text-decoration-style': newTextDecoration.Style,
            'text-decoration-thickness': (
              newTextDecoration.Thickness == null
              ? 'from-font'
              : Math.round(newTextDecoration.Thickness) + 'px'
            )
          })
        }
      }
    }

  /**** TextShadow ****/

    get TextShadow () {
      let TextShadow = css(this.Peer,'text-shadow')
      if (TextShadow === 'none') {
        return { xOffset:0, yOffset:0, BlurRadius:0, Color:'#00000000' }
      } else {
        TextShadow = TextShadow.replace(/,.*$/,'').split(' ')
        return {
          xOffset:   parseFloat(TextShadow[0]),
          yOffset:   parseFloat(TextShadow[1]),
          BlurRadius:parseFloat(TextShadow[2]),
          Color:     HexColor(TextShadow[3])
        }
      }
    }

    set TextShadow (newTextShadow:WAT_TextShadow) {
      allowPlainObject('text shadow',newTextShadow)
      if (newTextShadow != null) {
        expectLocation    ('text shadow x offset',newTextShadow.xOffset)
        expectLocation    ('text shadow y offset',newTextShadow.yOffset)
        expectDimension('text shadow blur radius',newTextShadow.BlurRadius)
        expectColor          ('text shadow color',newTextShadow.Color)
      }

      if (newTextShadow == null) {
        applyStyleToVisual(this, 'text-shadow',null)
      } else {
        let Color = HexColor(newTextShadow.Color)
        if (Color === '#00000000') {
          applyStyleToVisual(this, 'text-shadow','none')
        } else {
          applyStyleToVisual(this, 'text-shadow',
            Math.round(newTextShadow.xOffset) + 'px ' +
            Math.round(newTextShadow.yOffset) + 'px ' +
            Math.round(newTextShadow.BlurRadius) + 'px ' +
            shortHexColor(Color)
          )
        }
      }
    }

  /**** TextAlignment ****/

    get TextAlignment () {
      return css(this.Peer,'text-align')
    }

    set TextAlignment (newTextAlignment:WAT_TextAlignment) {
      allowOneOf('text alignment',newTextAlignment, WAT_TextAlignments)
      applyStyleToVisual(this, 'text-align', newTextAlignment)
    }

  /**** ForegroundColor ****/

    get ForegroundColor () {
      return HexColor(css(this.Peer,'color'))
    }

    set ForegroundColor (newColor:WAT_Color) {
      allowColor('foreground color',newColor)

      applyStyleToVisual(
        this, 'color', newColor == null ? null : HexColor(newColor)
      )
    }

  /**** Color (just a synonym for "ForegroundColor") ****/

    get Color () { return this.ForegroundColor }
    set Color (newColor:WAT_Color) { this.ForegroundColor = newColor }

  /**** BackgroundColor ****/

    get BackgroundColor () {
      return HexColor(css(this.Peer,'background-color'))
    }

    set BackgroundColor (newColor:WAT_Color) {
      allowColor('background color',newColor)

      applyStyleToVisual(
        this, 'background-color', newColor == null ? null : HexColor(newColor)
      )
    }

  /**** BackgroundTexture ****/

    get BackgroundTexture () {
      let {
        backgroundImage, backgroundPosition, backgroundSize, backgroundRepeat
      } = window.getComputedStyle(this.Peer)

      let Result = { ImageURL:'', Mode:'normal', xOffset:0, yOffset:0 }
        if (backgroundImage !== 'none') {
          Result.ImageURL = backgroundImage.slice(5,backgroundImage.length-2)
        }

        let Positions = backgroundPosition.split(' ')
        if (Positions[0].endsWith('px')) { Result.xOffset = Math.round(parseFloat(Positions[0])) }
        if (Positions[1].endsWith('px')) { Result.yOffset = Math.round(parseFloat(Positions[1])) }

        if (backgroundRepeat === 'no-repeat') {
          switch (backgroundSize) {
            case 'contain':
            case 'cover':     Result.Mode = backgroundSize; break
            case '100% 100%': Result.Mode = 'fill';         break
          }
        } else {
          Result.Mode = 'tile'
        }
      return Result
    }

    set BackgroundTexture (newTexture:WAT_BackgroundTexture) {
      allowPlainObject('background texture',newTexture)
      if (newTexture != null) {
        expectURL          ('background image url',newTexture.ImageURL)
        expectOneOf       ('background image mode',newTexture.Mode, WAT_BackgroundModes)
        expectLocation('background image x offset',newTexture.xOffset)
        expectLocation('background image y offset',newTexture.yOffset)
      }

      if (newTexture == null) {
        applyStylesToVisual(this, {
          'background-image':undefined, 'background-position':undefined,
          'background-size':undefined,  'background-repeat':undefined
        })
      } else {
        let BackgroundSize
          switch (newTexture.Mode) {
            case 'contain':
            case 'cover':   BackgroundSize = newTexture.Mode; break
            case 'fill':    BackgroundSize = '100% 100%';     break
            case 'tile':    BackgroundSize = 'auto auto';     break
          }
        applyStylesToVisual(this, {
          'background-image':    'url("' + newTexture.ImageURL + '")',
          'background-position': Math.round(newTexture.xOffset) + 'px ' + Math.round(newTexture.yOffset) + 'px',
          'background-size':     BackgroundSize,
          'background-repeat':   newTexture.Mode === 'tile' ? 'repeat' : 'no-repeat'
        })
      }
    }

  /**** BorderWidths ****/

    get BorderWidths () {
      let Peer = this.Peer
      return [
        parseFloat(css(Peer,'border-top-width')),
        parseFloat(css(Peer,'border-right-width')),
        parseFloat(css(Peer,'border-bottom-width')),
        parseFloat(css(Peer,'border-left-width'))
      ]
    }

    set BorderWidths (newBorderWidths:WAT_Dimension[]) {
      allowArray('list of border widths',newBorderWidths)
      if (newBorderWidths != null) {
        expectDimension   ('top border width',newBorderWidths[0])
        expectDimension ('right border width',newBorderWidths[1])
        expectDimension('bottom border width',newBorderWidths[2])
        expectDimension  ('left border width',newBorderWidths[3])
      }

      if (newBorderWidths == null) {
        applyStylesToVisual(this, {
          'border-top-width':    undefined,
          'border-right-width':  undefined,
          'border-bottom-width': undefined,
          'border-left-width':   undefined
        })
      } else {
        applyStylesToVisual(this, {
          'border-top-width':    Math.round(newBorderWidths[0]) + 'px',
          'border-right-width':  Math.round(newBorderWidths[1]) + 'px',
          'border-bottom-width': Math.round(newBorderWidths[2]) + 'px',
          'border-left-width':   Math.round(newBorderWidths[3]) + 'px'
        })
      }
    }

  /**** BorderColors ****/

    get BorderColors () {
      let Peer = this.Peer
      return [
        HexColor(css(Peer,'border-top-color')),
        HexColor(css(Peer,'border-right-color')),
        HexColor(css(Peer,'border-bottom-color')),
        HexColor(css(Peer,'border-left-color'))
      ]
    }

    set BorderColors (newBorderColors:WAT_Color[]) {
      allowArray('list of border colors',newBorderColors)
      if (newBorderColors != null) {
        expectColor   ('top border color',newBorderColors[0])
        expectColor ('right border color',newBorderColors[1])
        expectColor('bottom border color',newBorderColors[2])
        expectColor  ('left border color',newBorderColors[3])
      }

      if (newBorderColors == null) {
        applyStylesToVisual(this, {
          'border-top-color':    undefined,
          'border-right-color':  undefined,
          'border-bottom-color': undefined,
          'border-left-color':   undefined
        })
      } else {
        applyStylesToVisual(this, {
          'border-top-color':    newBorderColors[0],
          'border-right-color':  newBorderColors[1],
          'border-bottom-color': newBorderColors[2],
          'border-left-color':   newBorderColors[3]
        })
      }
    }

  /**** BorderStyles ****/

    get BorderStyles () {
      function normalizedBorderStyle (Value:any):WAT_BorderStyle {
        return (ValueIsOneOf(Value,WAT_BorderStyles) ? Value : 'none')
      }

      let Peer = this.Peer
      return [
        normalizedBorderStyle(css(Peer,'border-top-style')),
        normalizedBorderStyle(css(Peer,'border-right-style')),
        normalizedBorderStyle(css(Peer,'border-bottom-style')),
        normalizedBorderStyle(css(Peer,'border-left-style'))
      ]
    }

    set BorderStyles (newBorderStyles:WAT_BorderStyle[]) {
      allowArray('list of border styles',newBorderStyles)
      if (newBorderStyles != null) {
        expectOneOf   ('top border style',newBorderStyles[0], WAT_BorderStyles)
        expectOneOf ('right border style',newBorderStyles[1], WAT_BorderStyles)
        expectOneOf('bottom border style',newBorderStyles[2], WAT_BorderStyles)
        expectOneOf  ('left border style',newBorderStyles[3], WAT_BorderStyles)
      }

      if (newBorderStyles == null) {
        applyStylesToVisual(this, {
          'border-top-style':   undefined,
          'border-right-style': undefined,
          'border-bottom-style':undefined,
          'border-left-style':  undefined
        })
      } else {
        applyStylesToVisual(this, {
          'border-top-style':   newBorderStyles[0],
          'border-right-style': newBorderStyles[1],
          'border-bottom-style':newBorderStyles[2],
          'border-left-style':  newBorderStyles[3]
        })
      }
    }

  /**** BorderRadii ****/

    get BorderRadii () {
      let Peer = this.Peer
      return [
        parseFloat(css(Peer,'border-top-left-radius')),
        parseFloat(css(Peer,'border-top-right-radius')),
        parseFloat(css(Peer,'border-bottom-right-radius')),
        parseFloat(css(Peer,'border-bottom-left-radius'))
      ]
    }

    set BorderRadii (newBorderRadii:WAT_Dimension[]) {
      allowArray('list of border radii',newBorderRadii)
      if (newBorderRadii != null) {
        expectDimension    ('top-left border radius',newBorderRadii[0])
        expectDimension   ('top-right border radius',newBorderRadii[1])
        expectDimension('bottom-right border radius',newBorderRadii[2])
        expectDimension ('bottom-left border radius',newBorderRadii[3])
      }

      if (newBorderRadii == null) {
        applyStyleToVisual(this, 'border-radius',null)
      } else {
        applyStylesToVisual(this, {
          'border-top-left-radius':     Math.round(newBorderRadii[0]) + 'px',
          'border-top-right-radius':    Math.round(newBorderRadii[1]) + 'px',
          'border-bottom-right-radius': Math.round(newBorderRadii[2]) + 'px',
          'border-bottom-left-radius':  Math.round(newBorderRadii[3]) + 'px'
        })
      }
    }

  /**** BoxShadow ****/

    get BoxShadow () {
      let BoxShadow = css(this.Peer,'box-shadow')
      if (BoxShadow === 'none') {
        return { isInset:false, xOffset:0, yOffset:0, BlurRadius:0, SpreadRadius:0, Color:'#00000000' }
      } else {
        BoxShadow = BoxShadow.replace(/,.*$/,'').split(' ')

        let isInset = (BoxShadow[0] === 'inset')
        if (isInset) { BoxShadow.shift() }

        return {
          isInset,
          xOffset:     parseFloat(BoxShadow[0]),
          yOffset:     parseFloat(BoxShadow[1]),
          BlurRadius:  parseFloat(BoxShadow[2]),
          SpreadRadius:parseFloat(BoxShadow[3]),
          Color:       HexColor(BoxShadow[4])
        }
      }
    }

    set BoxShadow (newBoxShadow:WAT_BoxShadow) {
      allowPlainObject('box shadow',newBoxShadow)
      if (newBoxShadow != null) {
        expectBoolean      ('box shadow direction',newBoxShadow.isInset)
        expectLocation      ('box shadow x offset',newBoxShadow.xOffset)
        expectLocation      ('box shadow y offset',newBoxShadow.yOffset)
        expectDimension  ('box shadow blur radius',newBoxShadow.BlurRadius)
        expectDimension('box shadow spread radius',newBoxShadow.SpreadRadius)
        expectColor            ('box shadow color',newBoxShadow.Color)
      }

      if (newBoxShadow == null) {
        applyStyleToVisual(this, 'box-shadow',null)
      } else {
        if (HexColor(newBoxShadow.Color) === '#00000000') {
          applyStyleToVisual(this, 'box-shadow','none')
        } else {
          applyStyleToVisual(this, 'box-shadow',
            (newBoxShadow.isInset ? 'inset ' : '') +
            Math.round(newBoxShadow.xOffset) + 'px ' +
            Math.round(newBoxShadow.yOffset) + 'px ' +
            Math.round(newBoxShadow.BlurRadius)   + 'px ' +
            Math.round(newBoxShadow.SpreadRadius) + 'px ' +
            shortHexColor(HexColor(newBoxShadow.Color))
          )
        }
      }
    }

  /**** Cursor ****/

    get Cursor () {
      let CursorSpec = css(this.Peer,'cursor')
      return (
        CursorSpec.indexOf(',') > 0
        ? CursorSpec.replace(/^.*,\s*/,'')
        : CursorSpec
      )
    }

    set Cursor (newCursor:WAT_Cursor) {
      allowOneOf('cursor',newCursor, WAT_Cursors)

      if (newCursor == null) {
        applyStyleToVisual(this, 'cursor',null)// also clears any "customCursor"
      } else {
        let CursorSpec = css(this.Peer,'cursor')
        let Prefix = (
          CursorSpec.indexOf(',') > 0
          ? CursorSpec.replace(/,[^,]+$/,', ')
          : ''
        )

        applyStyleToVisual(this, 'cursor',Prefix + newCursor)
      }
    }

  /**** customCursor ****/

    get customCursor () {
      let Match = /^url\(([^\)])\)(\s+\d+)?(\s+\d+)?,/.exec(css(this.Peer,'cursor'))
      if (Match == null) {
        return undefined
      } else {
        let ImageURL = Match[1]
        let xOffset  = parseFloat(Match[2])
        let yOffset  = parseFloat(Match[3])

        if ('\'"'.indexOf(ImageURL[0]) >= 0) { ImageURL = ImageURL.slice(1,ImageURL.length-1) }
        if (! ValueIsNumberInRange(xOffset, 0,31)) { xOffset = 0 }
        if (! ValueIsNumberInRange(yOffset, 0,31)) { yOffset = 0 }

        return { ImageURL, xOffset, yOffset }
      }
    }

    set customCursor (newCustomCursor:WAT_customCursor | undefined) {
      allowPlainObject('custom cursor',newCustomCursor)
      if (newCustomCursor != null) {
        expectURL('custom cursor image url',newCustomCursor.ImageURL)
        expectNumberInRange('custom cursor x offset',newCustomCursor.xOffset, 0,31)
        expectNumberInRange('custom cursor y offset',newCustomCursor.yOffset, 0,31)
      }

      let CursorSpec     = css(this.Peer,'cursor')
      let standardCursor = (
        CursorSpec.indexOf(',') > 0
        ? CursorSpec.replace(/^.*,\s*/,'')
        : CursorSpec
      )

      if (newCustomCursor == null) {
        applyStyleToVisual(this, 'cursor',standardCursor)
      } else {
        applyStyleToVisual(this, 'cursor',(
          'url("' + newCustomCursor.ImageURL + '") ' +
          Math.round(newCustomCursor.xOffset) + 'px ' + Math.round(newCustomCursor.yOffset) + 'px, ' +
          standardCursor
        ))
      }
    }

  /**** trigger ****/

    public trigger (...ArgumentList:any):void {
      triggerEventFromVisual(this,...ArgumentList)
    }
  }

//----------------------------------------------------------------------------//
//                                 WAT_Applet                                 //
//----------------------------------------------------------------------------//

  export class WAT_Applet extends WAT_Visual {
  /**** Name ****/

    get Name () {
      let Candidate = data(PeerOfVisual(this),'wat-name')
      return (ValueIsUniversalName(Candidate) ? Candidate : undefined)
    }

    set Name (newName:string) { throwReadOnlyError('Name') }

  /**** globalVisual ****/

    public globalVisual (globalName:WAT_Name):WAT_Visual {
      expectUniversalName('global visual name',globalName)
      if (globalName[0] === '#') {
        return globalVisualOfApplet(this,globalName)
      } else {
        throwError('InvalidArgument: the given visual name is not a global one')
      }
    }

  /**** isBeingPreserved ****/

    get isBeingPreserved () {
      return (InternalsOfVisual(this).BackupStatus === 'isBeingPreserved')
    }
    set isBeingPreserved (newState:any) { throwReadOnlyError('isBeingPreserved') }

  /**** isBeingRestored ****/

    get isBeingRestored () {
      return (InternalsOfVisual(this).BackupStatus === 'isBeingRestored')
    }
    set isBeingRestored (newState:any) { throwReadOnlyError('isBeingRestored') }

  /**** isBeingRemoved ****/

    get isBeingRemoved () {
      return (InternalsOfVisual(this).BackupStatus === 'isBeingRemoved')
    }
    set isBeingRemoved (newState:any) { throwReadOnlyError('isBeingRemoved') }

  /**** CardList ****/

    get CardList () {
      let Result:WAT_Card[] = []
        let Peer = PeerOfVisual(this)
        filtered(Peer.children,'.WAT.Card').forEach(function (Peer) {
          Result.push(VisualOfElement(Peer as HTMLElement) as WAT_Card)
        })
      return Result
    }
    set CardList (newCardList:any) { throwReadOnlyError('CardList') }

  /**** CardLabelList ****/

    get CardLabelList () {
      let Result:WAT_Label[] = []
        let Peer = PeerOfVisual(this)
        filtered(Peer.children,'.WAT.Card').forEach(function (Peer) {
          Result.push(VisualOfElement(Peer as HTMLElement).Label)
        })
      return Result
    }
    set CardLabelList (newLabelList:any) { throwReadOnlyError('CardLabelList') }

  /**** CardCount ****/

    get CardCount () {
      let Peer = PeerOfVisual(this)
      return filtered(Peer.children,'.WAT.Card').length
    }
    set CardCount (newCardCount:any) { throwReadOnlyError('CardCount') }

  /**** Card ****/

    public Card (CardOrNameOrIndex:WAT_Card|WAT_Name|number):WAT_Card | undefined {
      switch (true) {
        case ValueIsCard(CardOrNameOrIndex): return (
          (CardOrNameOrIndex as WAT_Card).Applet === this
          ? CardOrNameOrIndex as WAT_Card
          : undefined
        )
        case ValueIsOrdinal(CardOrNameOrIndex):
          return this.CardAtIndex(CardOrNameOrIndex as number)
        case ValueIsName(CardOrNameOrIndex):
          return this.CardNamed(CardOrNameOrIndex as WAT_Name)
        default: throwError(
          'InvalidArgument: card, card name or card index expected'
        )
      }
    }

  /**** CardAtIndex ****/

    public CardAtIndex (Index:number):WAT_Card | undefined {
      expectOrdinal('card index',Index)
      return this.CardList[Index]
    }

  /**** CardNamed ****/

    public CardNamed (Name:WAT_Name):WAT_Card | undefined {
      expectName('card name',Name)

      let Result:WAT_Card | undefined = undefined
        let Peer = this.Peer
        filtered(Peer.children,'.WAT.Card').forEach((Peer) => {
          let Candidate = VisualForElement(Peer as HTMLElement) as WAT_Card
          if (Candidate.Name === Name) { Result = Candidate }
        })
      return Result
    }

  /**** CardLabelled ****/

    public CardLabelled (Label:WAT_Label):WAT_Card | undefined {
      expectLabel('card label',Label)

      let Result:WAT_Card | undefined = undefined
        let Peer = this.Peer
        filtered(Peer.children,'.WAT.Card').forEach((Peer) => {
          let Candidate = VisualForElement(Peer as HTMLElement) as WAT_Card
          if (Candidate.Label === Label) { Result = Candidate }
        })
      return Result
    }

  /**** IndexOfCard ****/

    public IndexOfCard (CardOrNameOrIndex:WAT_Card|WAT_Name|number):number {
      let Card = this.Card(CardOrNameOrIndex)
      return (Card == null ? -1 : this.CardList.indexOf(Card))
    }

  /**** acceptsCardAt ****/

    public acceptsCardAt (
      CardOrNameOrIndex:WAT_Card|WAT_Name|number,
      InsertionPoint?:WAT_Card|WAT_Name|number
    ):boolean {
      let Index = this.IndexOfCard(CardOrNameOrIndex)
      if (Index >= 0) {
        return this.CardMayBeShiftedTo(Index,InsertionPoint as number)
      }                            // let "CardMayBeShiftedTo" do the validation

      Index = (
        InsertionPoint == null
        ? this.CardCount
        : this.IndexOfCard(InsertionPoint)
      )
      if (Index < 0) { return false }

      return true
    }

  /**** acceptsNewCardAt - but only for an existing master ****/

    public acceptsNewCardAt (
      Master:WAT_Name,
      InsertionPoint?:WAT_Card|WAT_Name|number
    ):boolean {
//    expectName('master name',Master)                  // will be checked below

      let MasterInfo = existingInfoForMaster(Master)
      if (MasterInfo.Category !== 'Card') { return false }

      let Index = (
        InsertionPoint == null
        ? this.CardCount
        : this.IndexOfCard(InsertionPoint)
      )
      if (Index < 0) { return false }

      return true
    }

  /**** newCardInsertedAt - but only for an existing master ****/

    public newCardInsertedAt (
      Master:WAT_Name, InsertionPoint?:WAT_Card|WAT_Name|number
    ):WAT_Card {
//    expectName('master name',Master)                  // will be checked below

      let MasterInfo = existingInfoForMaster(Master)
      if (MasterInfo.Category !== 'Card') throwError(
        'InvalidMaster: the given master cannot be used for a (new) card'
      )

      let Index = (
        InsertionPoint == null
        ? this.CardCount
        : this.IndexOfCard(InsertionPoint)
      )
      if (Index < 0) throwError(
        'InvalidArgument: the given insertion point does not exist or is not ' +
        'part of this applet'
      )

      return this.CardDeserializedFrom(MasterInfo.Template,Index)
    }

  /**** DuplicateOfCard ****/

    public DuplicateOfCard (CardOrNameOrIndex:WAT_Card|WAT_Name|number):WAT_Card {
      let Index = this.IndexOfCard(CardOrNameOrIndex)
      if (Index < 0) throwError(
        'InvalidArgument: the given card does not exist or is not part of ' +
        'this applet'
      )

      let CardSerialization = serializedVisual(this.CardList[Index])
      return this.CardDeserializedFrom(CardSerialization,Index+1)
    }

  /**** CardDeserializedFrom ****/

    public CardDeserializedFrom (
      Serialization:string, InsertionPoint?:WAT_Card|WAT_Name|number
    ):WAT_Card {
      expectText('card serialization',Serialization)

      let Index = (
        InsertionPoint == null
        ? this.CardCount
        : this.IndexOfCard(InsertionPoint)
      )
      if (Index < 0) throwError(
        'InvalidArgument: the given insertion point does not exist or is not ' +
        'part of this applet'
      )

      let CardPeer = ElementFromHTML(Serialization)

      let NeighbourCard = this.CardAtIndex(Index)
      if (NeighbourCard == null) {
        this.Peer.append(CardPeer)
      } else {
       this.Peer.insertBefore(CardPeer,NeighbourCard.Peer)
      }

      let newCard
        try {
          newCard = VisualBuiltFromPeer(CardPeer,'Card') as WAT_Card
        } catch (Signal) {
          remove(CardPeer)
          throw Signal
        }

        if (! this.acceptsCardAt(newCard,Index)) {
          remove(CardPeer)
          throwError(
            'InvalidOperation: the given serialized card must not be ' +
            'inserted into this applet'
          )
        }
      return newCard
    }

  /**** CardMayBeShiftedUp/Down ****/

    public CardMayBeShiftedUp (CardOrNameOrIndex:WAT_Card|WAT_Name|number):boolean {
      return (this.IndexOfCard(CardOrNameOrIndex) > 0)
    }

    public CardMayBeShiftedDown (CardOrNameOrIndex:WAT_Card|WAT_Name|number):boolean {
      let oldIndex = this.IndexOfCard(CardOrNameOrIndex)
      return (oldIndex >= 0) && (oldIndex < this.CardCount-1)
    }

  /**** CardMayBeShiftedTo ****/

    public CardMayBeShiftedTo (
      CardOrNameOrIndex:WAT_Card|WAT_Name|number,
      InsertionPoint:WAT_Card|WAT_Name|number
    ):boolean {
      let oldIndex = this.IndexOfCard(CardOrNameOrIndex)
      let newIndex = this.IndexOfCard(InsertionPoint)

      return (oldIndex >= 0) && (newIndex >= 0) && (oldIndex !== newIndex)
    }

  /**** shiftCardUp/Down ****/

    public shiftCardUp (CardOrNameOrIndex:WAT_Card|WAT_Name|number):void {
      let oldIndex = this.IndexOfCard(CardOrNameOrIndex)
      if (oldIndex < 0) throwError(
        'InvalidArgument: the given card does not exist or is not part of ' +
        'this applet'
      )

      if (oldIndex > 0) {
        let prevCard = this.CardAtIndex(oldIndex-1) as WAT_Card
        this.CardAtIndex(oldIndex)?.Peer.insertBefore(prevCard.Peer)
      }
    }

    public shiftCardDown (CardOrNameOrIndex:WAT_Card|WAT_Name|number):void {
      let oldIndex = this.IndexOfCard(CardOrNameOrIndex)
      if (oldIndex < 0) throwError(
        'InvalidArgument: the given card does not exist or is not part of ' +
        'this applet'
      )

      if (oldIndex < this.CardCount-1) {
        let nextCard = this.CardAtIndex(oldIndex+1) as WAT_Card
        this.CardAtIndex(oldIndex)?.Peer.insertAfter(nextCard.Peer)
      }
    }

  /**** shiftCardTo ****/

    public shiftCardTo (
      CardOrNameOrIndex:WAT_Card|WAT_Name|number,
      InsertionPoint:WAT_Card|WAT_Name|number
    ):void {
      let oldIndex = this.IndexOfCard(CardOrNameOrIndex)
      if (oldIndex < 0) throwError(
        'InvalidArgument: the given card does not exist or is not part of ' +
        'this applet'
      )

      let newIndex = this.IndexOfCard(InsertionPoint)
      if (newIndex < 0) throwError(
        'InvalidArgument: the given insertion point does not exist or is not ' +
        'part of this applet'
      )

      if (oldIndex === newIndex) { return }

      let Card = this.CardAtIndex(oldIndex) as WAT_Card
      if (oldIndex === 0) {
        this.Peer.prepend(Card.Peer)
      } else {
        if (oldIndex < newIndex) { newIndex += 1 }

        let prevCard = this.CardAtIndex(newIndex)
        if (prevCard == null) {
          this.Peer.append(Card.Peer)
        } else {
          Card.Peer.insertAfter(prevCard.Peer)
        }
      }
    }

  /**** removeCard ****/

    public removeCard (CardOrNameOrIndex:WAT_Card|WAT_Name|number):void {
      let Card = this.Card(CardOrNameOrIndex)
      if (Card == null) { return }                  // this method is idempotent

      releaseVisual(Card,'recursively')
      remove(Card.Peer)

      if (this.CardCount === 0) {  // an applet should always contain >= 1 cards
        css(this.newCardInsertedAt('plainCard',0).Peer,'visibility','visible')
      }
    }

  /**** shownCard ****/

    get shownCard () {
      let CardList = this.CardList
      for (let i = 0, l = CardList.length; i < l; i++) {
        if (CardList[i].isVisible) { return CardList[i] }
      }

      if (CardList.length === 0) {
        CardList = [this.newCardInsertedAt('plainCard',0)]
      }

      this.showCard(CardList[0])
      return CardList[0]
    }

    set shownCard (newCard:WAT_Card) { throwReadOnlyError('shownCard') }

  /**** shownCardIndex ****/

    get shownCardIndex () {
      let CardList = this.CardList
      for (let i = 0, l = CardList.length; i < l; i++) {
        if (CardList[i].isVisible) { return i }
      }

      if (CardList.length === 0) {
        CardList = [this.newCardInsertedAt('plainCard',0)]
      }

      this.showCard(CardList[0])
      return 0
    }

    set shownCardIndex (newIndex:number) { throwReadOnlyError('shownCardIndex') }

  /**** CardIsShown ****/

    public CardIsShown (CardOrNameOrIndex:WAT_Card|WAT_Name|number):boolean {
      let CardIndex = this.IndexOfCard(CardOrNameOrIndex)
      return (CardIndex >= 0) && (this.CardAtIndex(CardIndex) as WAT_Card).isVisible
    }

  /**** showCard ****/

    public showCard (CardOrNameOrIndex:WAT_Card|WAT_Name|number):void {
      let CardIndex = this.IndexOfCard(CardOrNameOrIndex)
      if (CardIndex < 0) {
        throwError(
          'InvalidArgument: the given card does not exist or is not part of ' +
          'this applet'
        )
      } else {
        let CardElement = PeerOfVisual(this.CardAtIndex(CardIndex) as WAT_Card)

        filtered(this.Peer.children,'.WAT.Card').forEach((Peer) => {
          if (Peer === CardElement) {
            css(Peer as HTMLElement, 'visibility','visible')
          } else {
            css(Peer as HTMLElement, 'visibility','hidden')
          }
        })
      }
    }

  /**** showFirst/Prev/Next/LastCard ****/

    public showFirstCard ():void {
      this.showCard(0)
    }

    public showPrevCard ():void {
      this.showCard(Math.max(0,this.shownCardIndex-1))
    }

    public showPreviousCard ():void {
      this.showCard(Math.max(0,this.shownCardIndex-1))
    }

    public showNextCard ():void {
      this.showCard(Math.min(this.shownCardIndex+1,this.CardCount-1))
    }

    public showLastCard ():void {
      this.showCard(this.CardCount-1)
    }

  /**** OverlayList ****/

    get OverlayList () {
      let Result:WAT_Overlay[] = []
        let Peer = PeerOfVisual(this)
        filtered(Peer.children,'.WAT.Overlay').forEach(function (Peer) {
          Result.push(VisualOfElement(Peer as HTMLElement) as WAT_Overlay)
        })
      return Result
    }
    set OverlayList (newOverlayList:any) { throwReadOnlyError('OverlayList') }

  /**** OverlayLabelList ****/

    get OverlayLabelList () {
      let Result:WAT_Label[] = []
        let Peer = PeerOfVisual(this)
        filtered(Peer.children,'.WAT.Overlay').forEach(function (Peer) {
          Result.push(VisualOfElement(Peer as HTMLElement).Label)
        })
      return Result
    }
    set OverlayLabelList (newLabelList:any) { throwReadOnlyError('OverlayLabelList') }

  /**** OverlayCount ****/

    get OverlayCount () {
      let Peer = PeerOfVisual(this)
      return filtered(Peer.children,'.WAT.Overlay').length
    }
    set OverlayCount (newOverlayCount:any) { throwReadOnlyError('OverlayCount') }

  /**** Overlay ****/

    public Overlay (OverlayOrNameOrIndex:WAT_Overlay|WAT_Name|number):WAT_Overlay | undefined {
      switch (true) {
        case ValueIsOverlay(OverlayOrNameOrIndex): return (
          (OverlayOrNameOrIndex as WAT_Overlay).Applet === this
          ? OverlayOrNameOrIndex as WAT_Overlay
          : undefined
        )
        case ValueIsOrdinal(OverlayOrNameOrIndex):
          return this.OverlayAtIndex(OverlayOrNameOrIndex as number)
        case ValueIsName(OverlayOrNameOrIndex):
          return this.OverlayNamed(OverlayOrNameOrIndex as WAT_Name)
        default: throwError(
          'InvalidArgument: overlay, overlay name or overlay index expected'
        )
      }
    }

  /**** OverlayAtIndex ****/

    public OverlayAtIndex (Index:number):WAT_Overlay | undefined {
      expectOrdinal('card index',Index)
      return this.OverlayList[Index]
    }

  /**** OverlayNamed ****/

    public OverlayNamed (Name:WAT_Name):WAT_Overlay | undefined {
      expectName('overlay name',Name)

      let Result:WAT_Overlay | undefined = undefined
        let Peer = this.Peer
        filtered(Peer.children,'.WAT.Overlay').forEach((Peer) => {
          let Candidate = VisualForElement(Peer as HTMLElement) as WAT_Overlay
          if (Candidate.Name === Name) { Result = Candidate }
        })
      return Result
    }

  /**** OverlayLabelled ****/

    public OverlayLabelled (Label:WAT_Label):WAT_Overlay | undefined {
      expectLabel('overlay label',Label)

      let Result:WAT_Overlay | undefined = undefined
        let Peer = this.Peer
        filtered(Peer.children,'.WAT.Overlay').forEach((Peer) => {
          let Candidate = VisualForElement(Peer as HTMLElement) as WAT_Overlay
          if (Candidate.Label === Label) { Result = Candidate }
        })
      return Result
    }

  /**** IndexOfOverlay ****/

    public IndexOfOverlay (OverlayOrNameOrIndex:WAT_Overlay|WAT_Name|number):number {
      let Overlay = this.Overlay(OverlayOrNameOrIndex)
      return (Overlay == null ? -1 : this.OverlayList.indexOf(Overlay))
    }

  /**** acceptsOverlayAt ****/

    public acceptsOverlayAt (
      OverlayOrNameOrIndex:WAT_Overlay|WAT_Name|number,
      InsertionPoint?:WAT_Overlay|WAT_Name|number
    ):boolean {
      let Index = this.IndexOfOverlay(OverlayOrNameOrIndex)
      if (Index >= 0) {
        return this.OverlayMayBeShiftedTo(Index,InsertionPoint as number)
      }                         // let "OverlayMayBeShiftedTo" do the validation

      Index = (
        InsertionPoint == null
        ? this.OverlayCount
        : this.IndexOfOverlay(InsertionPoint)
      )
      if (Index < 0) { return false }

      return true
    }

  /**** acceptsNewOverlayAt - but only for an existing master ****/

    public acceptsNewOverlayAt (
      Master:WAT_Name,
      InsertionPoint?:WAT_Overlay|WAT_Name|number
    ):boolean {
//    expectName('master name',Master)                  // will be checked below

      let MasterInfo = existingInfoForMaster(Master)
      if (MasterInfo.Category !== 'Overlay') { return false }

      let Index = (
        InsertionPoint == null
        ? this.OverlayCount
        : this.IndexOfOverlay(InsertionPoint)
      )
      if (Index < 0) { return false }

      return true
    }

  /**** newOverlayInsertedAt - but only for an existing master ****/

    public newOverlayInsertedAt (
      Master:WAT_Name, InsertionPoint?:WAT_Overlay|WAT_Name|number
    ):WAT_Overlay {
//    expectName('master name',Master)                  // will be checked below

      let MasterInfo = existingInfoForMaster(Master)
      if (MasterInfo.Category !== 'Overlay') throwError(
        'InvalidMaster: the given master cannot be used for a (new) overlay'
      )

      let Index = (
        InsertionPoint == null
        ? this.OverlayCount
        : this.IndexOfOverlay(InsertionPoint)
      )
      if (Index < 0) throwError(
        'InvalidArgument: the given insertion point does not exist or is not ' +
        'part of this applet'
      )

      return this.OverlayDeserializedFrom(MasterInfo.Template,Index)
    }

  /**** DuplicateOfOverlay ****/

    public DuplicateOfOverlay (OverlayOrNameOrIndex:WAT_Overlay|WAT_Name|number):WAT_Overlay {
      let Index = this.IndexOfOverlay(OverlayOrNameOrIndex)
      if (Index < 0) throwError(
        'InvalidArgument: the given overlay does not exist or is not part of ' +
        'this applet'
      )

      let OverlaySerialization = serializedVisual(this.OverlayList[Index])
      return this.OverlayDeserializedFrom(OverlaySerialization,Index+1)
    }

  /**** OverlayDeserializedFrom ****/

    public OverlayDeserializedFrom (
      Serialization:string, InsertionPoint?:WAT_Overlay|WAT_Name|number
    ):WAT_Overlay {
      expectText('overlay serialization',Serialization)

      let Index = (
        InsertionPoint == null
        ? this.OverlayCount
        : this.IndexOfOverlay(InsertionPoint)
      )
      if (Index < 0) throwError(
        'InvalidArgument: the given insertion point does not exist or is not ' +
        'part of this applet'
      )

      let OverlayPeer = ElementFromHTML(Serialization)

      let NeighbourOverlay = this.OverlayAtIndex(Index)
      if (NeighbourOverlay == null) {
        this.Peer.append(OverlayPeer)
      } else {
        this.Peer.insertBefore(OverlayPeer,NeighbourOverlay.Peer)
      }

      let newOverlay
        try {
          newOverlay = VisualBuiltFromPeer(OverlayPeer,'Overlay') as WAT_Overlay
        } catch (Signal) {
          remove(OverlayPeer)
          throw Signal
        }

        if (! this.acceptsOverlayAt(newOverlay,Index)) {
          remove(OverlayPeer)
          throwError(
            'InvalidOperation: the given serialized overlay must not be ' +
            'inserted into this applet'
          )
        }
      return newOverlay
    }

  /**** OverlayMayBeShiftedUp/Down ****/

    public OverlayMayBeShiftedUp (OverlayOrNameOrIndex:WAT_Overlay|WAT_Name|number):boolean {
      return (this.IndexOfOverlay(OverlayOrNameOrIndex) > 0)
    }

    public OverlayMayBeShiftedDown (OverlayOrNameOrIndex:WAT_Overlay|WAT_Name|number):boolean {
      let oldIndex = this.IndexOfOverlay(OverlayOrNameOrIndex)
      return (oldIndex >= 0) && (oldIndex < this.OverlayCount-1)
    }

  /**** OverlayMayBeShiftedTo ****/

    public OverlayMayBeShiftedTo (
      OverlayOrNameOrIndex:WAT_Overlay|WAT_Name|number,
      InsertionPoint:WAT_Overlay|WAT_Name|number
    ):boolean {
      let oldIndex = this.IndexOfOverlay(OverlayOrNameOrIndex)
      let newIndex = this.IndexOfOverlay(InsertionPoint)

      return (oldIndex >= 0) && (newIndex >= 0) && (oldIndex !== newIndex)
    }

  /**** shiftOverlayUp/Down ****/

    public shiftOverlayUp (
      OverlayOrNameOrIndex:WAT_Overlay|WAT_Name|number
    ):void {
      let oldIndex = this.IndexOfOverlay(OverlayOrNameOrIndex)
      if (oldIndex < 0) throwError(
        'InvalidArgument: the given overlay does not exist or is not part of ' +
        'this applet'
      )

      if (oldIndex > 0) {
        let prevOverlay = this.OverlayAtIndex(oldIndex-1) as WAT_Overlay
        this.OverlayAtIndex(oldIndex)?.Peer.insertBefore(prevOverlay.Peer)
      }
    }

    public shiftOverlayDown (
      OverlayOrNameOrIndex:WAT_Overlay|WAT_Name|number
    ):void {
      let oldIndex = this.IndexOfOverlay(OverlayOrNameOrIndex)
      if (oldIndex < 0) throwError(
        'InvalidArgument: the given overlay does not exist or is not part of ' +
        'this applet'
      )

      if (oldIndex < this.OverlayCount-1) {
        let nextOverlay = this.OverlayAtIndex(oldIndex+1) as WAT_Overlay
        this.OverlayAtIndex(oldIndex)?.Peer.insertAfter(nextOverlay.Peer)
      }
    }

  /**** shiftOverlayTo ****/

    public shiftOverlayTo (
      OverlayOrNameOrIndex:WAT_Overlay|WAT_Name|number,
      InsertionPoint:WAT_Overlay|WAT_Name|number
    ):void {
      let oldIndex = this.IndexOfOverlay(OverlayOrNameOrIndex)
      if (oldIndex < 0) throwError(
        'InvalidArgument: the given overlay does not exist or is not part of ' +
        'this applet'
      )

      let newIndex = this.IndexOfOverlay(InsertionPoint)
      if (newIndex < 0) throwError(
        'InvalidArgument: the given insertion point does not exist or is not ' +
        'part of this applet'
      )

      if (oldIndex === newIndex) { return }

      let Overlay = this.OverlayAtIndex(oldIndex) as WAT_Overlay
      if (oldIndex === 0) {
        this.Peer.prepend(Overlay.Peer)
      } else {
        if (oldIndex < newIndex) { newIndex += 1 }

        let prevOverlay = this.OverlayAtIndex(newIndex)
        if (prevOverlay == null) {
          this.Peer.append(Overlay.Peer)
        } else {
          Overlay.Peer.insertAfter(prevOverlay.Peer)
        }
      }
    }

  /**** removeOverlay ****/

    public removeOverlay (OverlayOrNameOrIndex:WAT_Overlay|WAT_Name|number):void {
      let Overlay = this.Overlay(OverlayOrNameOrIndex)
      if (Overlay == null) { return }               // this method is idempotent

      releaseVisual(Overlay,'recursively')
      remove(Overlay.Peer)
    }

  /**** frontmostOverlayOfClass ****/

    public frontmostOverlayOfClass (ClassName:WAT_Name):WAT_Overlay | undefined {
      expectName('HTML class name',ClassName)

      let PeerList = filtered(this.Peer.children,'.WAT.Overlay.' + ClassName)
      let Candidate = PeerList[PeerList.length-1]
      return (
        Candidate == null
        ? undefined
        : VisualOfElement(Candidate) as WAT_Overlay
      )
    }

  /**** bringOverlayToFrontOfClass ****/

    public bringOverlayToFrontOfClass (
      OverlayOrNameOrIndex:WAT_Overlay|WAT_Name|number, ClassName:WAT_Name
    ):void {
      expectName('HTML class name',ClassName)

      let Overlay = this.Overlay(OverlayOrNameOrIndex)
      if (Overlay == null) throwError(
        'InvalidArgument: the given overlay does not exist or is not part of ' +
        'this applet'
      )

      let OverlayPeer = Overlay.Peer
      if (! OverlayPeer.classList.contains(ClassName)) throwError(
        'InvalidArgument: the given overlay does not have class ' +
        quoted(ClassName) + ' itself'
      )

      let OverlayFound = false
      filtered(this.Peer.children,'.WAT.Overlay.' + ClassName).forEach((Peer) => {
        switch (true) {
          case (OverlayPeer === Peer): OverlayFound = true; break
          case OverlayFound:           this.Peer.insertBefore(Peer,OverlayPeer)
        }             // does not touch Overlay itself (keeps menus etc. intact)
      })
    }
  }

//----------------------------------------------------------------------------//
//                               WAT_Container                                //
//----------------------------------------------------------------------------//

  export abstract class WAT_Container extends WAT_Visual {
  /**** ComponentList ****/

    get ComponentList () {
      let Result:(WAT_Control|WAT_Compound)[] = []
        let Peer = PeerOfVisual(this)
        filtered(Peer.children,'.WAT.Control,.WAT.Compound').forEach(function (Peer) {
          Result.push(VisualOfElement(Peer as HTMLElement) as WAT_Control|WAT_Compound)
        })
      return Result
    }
    set ComponentList (newComponentList:any) { throwReadOnlyError('ComponentList') }

  /**** ComponentLabelList ****/

    get ComponentLabelList () {
      let Result:WAT_Label[] = []
        let Peer = PeerOfVisual(this)
        filtered(Peer.children,'.WAT.Control,.WAT.Compound').forEach(function (Peer) {
          Result.push(VisualOfElement(Peer as HTMLElement).Label)
        })
      return Result
    }
    set ComponentLabelList (newLabelList:any) { throwReadOnlyError('ComponentLabelList') }

  /**** ComponentCount ****/

    get ComponentCount () {
      let Peer = PeerOfVisual(this)
      return filtered(Peer.children,'.WAT.Control,.WAT.Compound').length
    }
    set ComponentCount (newComponentCount:any) { throwReadOnlyError('ComponentCount') }

  /**** Component ****/

    public Component (
      ComponentOrNameOrIndex:WAT_Control|WAT_Compound|WAT_Name|number
    ):WAT_Control|WAT_Compound|undefined {
      switch (true) {
        case ValueIsControl(ComponentOrNameOrIndex): return (
          (ComponentOrNameOrIndex as WAT_Control).Container === this
          ? ComponentOrNameOrIndex as WAT_Control
          : undefined
        )
        case ValueIsCompound(ComponentOrNameOrIndex): return (
          (ComponentOrNameOrIndex as WAT_Compound).Container === this
          ? ComponentOrNameOrIndex as WAT_Compound
          : undefined
        )
        case ValueIsOrdinal(ComponentOrNameOrIndex):
          return this.ComponentAtIndex(ComponentOrNameOrIndex as number)
        case ValueIsName(ComponentOrNameOrIndex):
          return this.ComponentNamed(ComponentOrNameOrIndex as WAT_Name)
        default: throwError(
          'InvalidArgument: component, component name or component index expected'
        )
      }
    }

  /**** ComponentAtIndex ****/

    public ComponentAtIndex (Index:number):WAT_Control|WAT_Compound|undefined {
      expectOrdinal('component index',Index)
      return this.ComponentList[Index]
    }

  /**** ComponentNamed ****/

    public ComponentNamed (Name:WAT_Name):WAT_Control|WAT_Compound|undefined {
      expectName('component name',Name)

      let Result:WAT_Control|WAT_Compound|undefined = undefined
        let Peer = this.Peer
        filtered(Peer.children,'.WAT.Control,.WAT.Compound').forEach((Peer) => {
          let Candidate = VisualForElement(Peer as HTMLElement) as WAT_Control|WAT_Compound
          if (Candidate.Name === Name) { Result = Candidate }
        })
      return Result
    }

  /**** ComponentLabelled ****/

    public ComponentLabelled (Label:WAT_Label):WAT_Control|WAT_Compound|undefined {
      expectLabel('component label',Label)

      let Result:WAT_Control|WAT_Compound|undefined = undefined
        let Peer = this.Peer
        filtered(Peer.children,'.WAT.Control,.WAT.Compound').forEach((Peer) => {
          let Candidate = VisualForElement(Peer as HTMLElement) as WAT_Control|WAT_Compound
          if (Candidate.Label === Label) { Result = Candidate }
        })
      return Result
    }

  /**** IndexOfComponent ****/

    public IndexOfComponent (
      ComponentOrNameOrIndex:WAT_Control|WAT_Compound|WAT_Name|number
    ):number {
      let Component = this.Component(ComponentOrNameOrIndex)
      return (Component == null ? -1 : this.ComponentList.indexOf(Component))
    }

  /**** acceptsComponentAt ****/

    public acceptsComponentAt (
      ComponentOrNameOrIndex:WAT_Control|WAT_Compound|WAT_Name|number,
      InsertionPoint?:WAT_Control|WAT_Compound|WAT_Name|number
    ):boolean {
      let Index = this.IndexOfComponent(ComponentOrNameOrIndex)
      if (Index >= 0) {
        return this.ComponentMayBeShiftedTo(Index,InsertionPoint as number)
      }                       // let "ComponentMayBeShiftedTo" do the validation

      Index = (
        InsertionPoint == null
        ? this.ComponentCount
        : this.IndexOfComponent(InsertionPoint)
      )
      if (Index < 0) { return false }

      return true
    }

  /**** acceptsNewComponentAt - but only for an existing master ****/

    public acceptsNewComponentAt (
      Master:WAT_Name,
      InsertionPoint?:WAT_Control|WAT_Compound|WAT_Name|number
    ):boolean {
//    expectName('master name',Master)                  // will be checked below

      let MasterInfo = existingInfoForMaster(Master)
      if (
        (MasterInfo.Category !== 'Control') &&
        (MasterInfo.Category !== 'Compound')
      ) { return false }

      let Index = (
        InsertionPoint == null
        ? this.ComponentCount
        : this.IndexOfComponent(InsertionPoint)
      )
      if (Index < 0) { return false }

      return true
    }

  /**** newComponentInsertedAt - but only for an existing master ****/

    public newComponentInsertedAt (
      Master:WAT_Name,
      InsertionPoint?:WAT_Control|WAT_Compound|WAT_Name|number
    ):WAT_Control|WAT_Compound {
//    expectName('master name',Master)                  // will be checked below

      let MasterInfo = existingInfoForMaster(Master)
      if (
        (MasterInfo.Category !== 'Control') &&
        (MasterInfo.Category !== 'Compound')
      ) throwError(
        'InvalidMaster: the given master cannot be used for a (new) component'
      )

      let Index = (
        InsertionPoint == null
        ? this.ComponentCount
        : this.IndexOfComponent(InsertionPoint)
      )
      if (Index < 0) throwError(
        'InvalidArgument: the given insertion point does not exist or is not ' +
        'part of this applet'
      )

      return this.ComponentDeserializedFrom(MasterInfo.Template,Index)
    }

  /**** DuplicateOfComponent ****/

    public DuplicateOfComponent (
      ComponentOrNameOrIndex:WAT_Control|WAT_Compound|WAT_Name|number
    ):WAT_Control|WAT_Compound {
      let Index = this.IndexOfComponent(ComponentOrNameOrIndex)
      if (Index < 0) throwError(
        'InvalidArgument: the given component does not exist or is not part ' +
        'of this applet'
      )

      let ComponentSerialization = serializedVisual(this.ComponentList[Index])
      return this.ComponentDeserializedFrom(ComponentSerialization,Index+1)
    }

  /**** ComponentDeserializedFrom ****/

    public ComponentDeserializedFrom (
      Serialization:string,
      InsertionPoint?:WAT_Control|WAT_Compound|WAT_Name|number
    ):WAT_Control|WAT_Compound {
      expectText('component serialization',Serialization)

      let Index = (
        InsertionPoint == null
        ? this.ComponentCount
        : this.IndexOfComponent(InsertionPoint)
      )
      if (Index < 0) throwError(
        'InvalidArgument: the given insertion point does not exist or is not ' +
        'part of this container'
      )

      let ComponentPeer = ElementFromHTML(Serialization)

      let NeighbourComponent = this.ComponentAtIndex(Index)
      if (NeighbourComponent == null) {
        this.Peer.append(ComponentPeer)
      } else {
        this.Peer.insertBefore(ComponentPeer,NeighbourComponent.Peer)
      }

      let newComponent
        try {
          newComponent = VisualBuiltFromPeer(ComponentPeer,'Component') as WAT_Control|WAT_Compound
        } catch (Signal) {
          remove(ComponentPeer)
          throw Signal
        }

        if (! this.acceptsComponentAt(newComponent,Index)) {
          remove(ComponentPeer)
          throwError(
            'InvalidOperation: the given serialized component must not be ' +
            'inserted into this container'
          )
        }
      return newComponent
    }

  /**** ComponentMayBeShiftedUp/Down ****/

    public ComponentMayBeShiftedUp (
      ComponentOrNameOrIndex:WAT_Control|WAT_Compound|WAT_Name|number
    ):boolean {
      return (this.IndexOfComponent(ComponentOrNameOrIndex) > 0)
    }

    public ComponentMayBeShiftedDown (
      ComponentOrNameOrIndex:WAT_Control|WAT_Compound|WAT_Name|number
    ):boolean {
      let oldIndex = this.IndexOfComponent(ComponentOrNameOrIndex)
      return (oldIndex >= 0) && (oldIndex < this.ComponentCount-1)
    }

  /**** ComponentMayBeShiftedTo ****/

    public ComponentMayBeShiftedTo (
      ComponentOrNameOrIndex:WAT_Control|WAT_Compound|WAT_Name|number,
      InsertionPoint:WAT_Control|WAT_Compound|WAT_Name|number
    ):boolean {
      let oldIndex = this.IndexOfComponent(ComponentOrNameOrIndex)
      let newIndex = this.IndexOfComponent(InsertionPoint)

      return (oldIndex >= 0) && (newIndex >= 0) && (oldIndex !== newIndex)
    }

  /**** shiftComponentToTop ****/

    public shiftComponentToTop (
      ComponentOrNameOrIndex:WAT_Control|WAT_Compound|WAT_Name|number
    ):void {
      let oldIndex = this.IndexOfComponent(ComponentOrNameOrIndex)
      if (oldIndex < 0) throwError(
        'InvalidArgument: the given component does not exist or is not part ' +
        'of this applet'
      )

      if (oldIndex > 0) {
        let Component = this.ComponentAtIndex(oldIndex) as WAT_Component
        this.Peer.prepend(Component.Peer)
      }
    }

  /**** shiftComponentUp ****/

    public shiftComponentUp (
      ComponentOrNameOrIndex:WAT_Control|WAT_Compound|WAT_Name|number
    ):void {
      let oldIndex = this.IndexOfComponent(ComponentOrNameOrIndex)
      if (oldIndex < 0) throwError(
        'InvalidArgument: the given component does not exist or is not part ' +
        'of this applet'
      )

      if (oldIndex > 0) {
        let prevComponent = this.ComponentAtIndex(oldIndex-1) as WAT_Component
        this.ComponentAtIndex(oldIndex)?.Peer.insertBefore(prevComponent.Peer)
      }
    }

  /**** shiftComponentDown ****/

    public shiftComponentDown (
      ComponentOrNameOrIndex:WAT_Control|WAT_Compound|WAT_Name|number
    ):void {
      let oldIndex = this.IndexOfComponent(ComponentOrNameOrIndex)
      if (oldIndex < 0) throwError(
        'InvalidArgument: the given component does not exist or is not part ' +
        'of this applet'
      )

      if (oldIndex < this.ComponentCount-1) {
        let nextComponent = this.ComponentAtIndex(oldIndex+1) as WAT_Component
        this.ComponentAtIndex(oldIndex)?.Peer.insertAfter(nextComponent.Peer)
      }
    }

  /**** shiftComponentToBottom ****/

    public shiftComponentToBottom (
      ComponentOrNameOrIndex:WAT_Control|WAT_Compound|WAT_Name|number
    ):void {
      let oldIndex = this.IndexOfComponent(ComponentOrNameOrIndex)
      if (oldIndex < 0) throwError(
        'InvalidArgument: the given component does not exist or is not part ' +
        'of this applet'
      )

      if (oldIndex < this.ComponentCount-1) {
        let Component = this.ComponentAtIndex(oldIndex) as WAT_Component
        this.Peer.append(Component.Peer)
      }
    }

  /**** shiftComponentTo ****/

    public shiftComponentTo (
      ComponentOrNameOrIndex:WAT_Control|WAT_Compound|WAT_Name|number,
      InsertionPoint:WAT_Control|WAT_Compound|WAT_Name|number
    ):void {
      let oldIndex = this.IndexOfComponent(ComponentOrNameOrIndex)
      if (oldIndex < 0) throwError(
        'InvalidArgument: the given component does not exist or is not part ' +
        'of this applet'
      )

      let newIndex = this.IndexOfComponent(InsertionPoint)
      if (newIndex < 0) throwError(
        'InvalidArgument: the given insertion point does not exist or is not ' +
        'part of this applet'
      )

      if (oldIndex === newIndex) { return }

      let Component = this.ComponentAtIndex(oldIndex) as WAT_Component
      if (oldIndex === 0) {
        this.Peer.prepend(Component.Peer)
      } else {
        if (oldIndex < newIndex) { newIndex += 1 }

        let prevComponent = this.ComponentAtIndex(newIndex)
        if (prevComponent == null) {
          this.Peer.append(Component.Peer)
        } else {
          this.Peer.insertAfter(Component.Peer,prevComponent.Peer)
        }
      }
    }

  /**** ComponentMayBeRemoved ****/

    public ComponentMayBeRemoved (
      ComponentOrNameOrIndex:WAT_Control|WAT_Compound|WAT_Name|number
    ):boolean {
      return (this.IndexOfComponent(ComponentOrNameOrIndex) >= 0)
    }

  /**** removeComponent ****/

    public removeComponent (
      ComponentOrNameOrIndex:WAT_Control|WAT_Compound|WAT_Name|number
    ):void {
      let Component = this.Component(ComponentOrNameOrIndex)
      if (Component == null) { return }             // this method is idempotent

      releaseVisual(Component,'recursively')
      remove(Component.Peer)
    }
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
  /**** isVisible ****/

    get isVisible () {
      return (css(this.Peer,'visibility') !== 'hidden')
    }

    set isVisible (newVisibility:boolean) {
      expectBoolean('visibility',newVisibility)

      if (newVisibility === true) {
        this.Applet.showCard(this)
      } else {
        throwError(
          'InvalidArgument: a card cannot be explicitly hidden, please ' +
          'select another card to be shown instead'
        )
      }
    }

  /**** show ****/

    public show () { this.isVisible = true }

  /**** mayBeDisplaced ****/

    get mayBeDisplaced ()                   { return false }
    set mayBeDisplaced (newSetting:boolean) { throwReadOnlyError('mayBeDisplaced') }

  /**** mayBeDeformed ****/

    get mayBeDeformed ()                   { return false }
    set mayBeDeformed (newSetting:boolean) { throwReadOnlyError('mayBeDeformed') }

  /**** Index ****/

    get Index () { return this.Applet.IndexOfCard(this) }
    set Index (newIndex:any) { throwReadOnlyError('Index') }

  /**** mayBeShiftedUp/Down ****/

    get mayBeShiftedUp () { return this.Applet.CardMayBeShiftedUp(this) }
    set mayBeShiftedUp (newValue:any) { throwReadOnlyError('mayBeShiftedUp') }

    get mayBeShiftedDown () { return this.Applet.CardMayBeShiftedDown(this) }
    set mayBeShiftedDown (newValue:any) { throwReadOnlyError('mayBeShiftedDown') }

  /**** mayBeShiftedTo ****/

    public mayBeShiftedTo (InsertionPoint:WAT_Card|WAT_Name|number):boolean {
      return this.Applet.CardMayBeShiftedTo(this,InsertionPoint)
    }

  /**** shiftUp/Down ****/

    public shiftUp   ():void { this.Applet.shiftCardUp(this) }
    public shiftDown ():void { this.Applet.shiftCardDown(this) }

  /**** shiftTo ****/

    public shiftTo (InsertionPoint:WAT_Card|WAT_Name|number):void {
      this.Applet.shiftCardTo(this,InsertionPoint)
    }

  /**** mayBeRemoved ****/

    get mayBeRemoved () { return this.Applet.CardMayBeRemoved(this) }
    set mayBeRemoved (newValue:any) { throwReadOnlyError('mayBeRemoved') }

  /**** remove ****/

    public remove ():void {
      this.Applet.removeCard(this)
    }
  }

//----------------------------------------------------------------------------//
//                                WAT_Overlay                                 //
//----------------------------------------------------------------------------//

  export class WAT_Overlay extends WAT_Layer {
  /**** mayBeDisplaced ****/

    get mayBeDisplaced ()                   { return true }
    set mayBeDisplaced (newSetting:boolean) { throwReadOnlyError('mayBeDisplaced') }

  /**** mayBeDeformed ****/

    get mayBeDeformed ()                   { return true }
    set mayBeDeformed (newSetting:boolean) { throwReadOnlyError('mayBeDeformed') }

  /**** Index ****/

    get Index () { return this.Applet.IndexOfOverlay(this) }
    set Index (newIndex:any) { throwReadOnlyError('Index') }

  /**** mayBeShiftedUp/Down ****/

    get mayBeShiftedUp () { return this.Applet.OverlayMayBeShiftedUp(this) }
    set mayBeShiftedUp (newValue:any) { throwReadOnlyError('mayBeShiftedUp') }

    get mayBeShiftedDown () { return this.Applet.OverlayMayBeShiftedDown(this) }
    set mayBeShiftedDown (newValue:any) { throwReadOnlyError('mayBeShiftedDown') }

  /**** mayBeShiftedTo ****/

    public mayBeShiftedTo (InsertionPoint:WAT_Overlay|WAT_Name|number):boolean {
      return this.Applet.OverlayMayBeShiftedTo(this,InsertionPoint)
    }

  /**** shiftUp/Down ****/

    public shiftUp   ():void { this.Applet.shiftOverlayUp(this) }
    public shiftDown ():void { this.Applet.shiftOverlayDown(this) }

  /**** shiftTo ****/

    public shiftTo (InsertionPoint:WAT_Overlay|WAT_Name|number):void {
      this.Applet.shiftOverlayTo(this,InsertionPoint)
    }

  /**** mayBeRemoved ****/

    get mayBeRemoved () { return this.Applet.OverlayMayBeRemoved(this) }
    set mayBeRemoved (newValue:any) { throwReadOnlyError('mayBeRemoved') }

  /**** remove ****/

    public remove ():void {
      this.Applet.removeOverlay(this)
    }

  /**** showAround ****/

    public showAround (
      x:number,y:number, Constraint:'withinApplet'|'withinViewport' = 'withinViewport'
    ):void {
      expectLocation('x coordinate',x)
      expectLocation('y coordinate',y)
      expectOneOf('positioning constraint',Constraint,['withinApplet','withinViewport'])

      let Applet = this.Applet

      if (Constraint === 'withinApplet') { // x/y are coord.s relative to applet
        x = Math.max(0, Math.min(x, Applet.Width-this.Peer.offsetWidth))
        y = Math.max(0, Math.min(y,Applet.Height-this.Peer.offsetHeight))

        changeGeometryOfVisualTo(this, x,y, undefined,undefined)
      } else {
        let ViewportWidth  = document.body.clientWidth
        let ViewportHeight = Math.max(window.innerHeight,document.body.clientHeight)

        x = Math.max(0, Math.min(x, ViewportWidth-this.Peer.offsetWidth))
        y = Math.max(0, Math.min(y,ViewportHeight-this.Peer.offsetHeight))

        let AppletGeometryOnDisplay = Applet.GeometryOnDisplay
        let AppletX = AppletGeometryOnDisplay.x
        let AppletY = AppletGeometryOnDisplay.y

        changeGeometryOfVisualTo(this, x-AppletX,y-AppletY, undefined,undefined)
      } // x/y are viewport coord.s, but Overlay is placed within its applet
    }

  /**** isFrontmostOfClass ****/

    public isFrontmostOfClass (ClassName:WAT_Name):boolean {
      return (this.Applet.frontmostOverlayOfClass(ClassName) === this)
    }

  /**** bringToFrontOfClass ****/

    public bringToFrontOfClass (ClassName:WAT_Name):void {
      this.Applet.bringOverlayToFrontOfClass(ClassName)
    }
  }

//----------------------------------------------------------------------------//
//                               WAT_Component                                //
//----------------------------------------------------------------------------//

  export interface WAT_Component {
    Peer:HTMLElement,
    trigger:(...ArgumentList:any) => void,

    Index:number
    mayBeDisplaced:boolean
    mayBeDeformed:boolean
    mayBeShiftedUp:boolean
    mayBeShiftedDown:boolean
    mayBeShiftedTo (InsertionPoint:WAT_Control|WAT_Compound|WAT_Name|number):boolean
    shiftUp ():void
    shiftDown ():void
    shiftTo (InsertionPoint:WAT_Control|WAT_Compound|WAT_Name|number):void
    remove ():void
  }

//----------------------------------------------------------------------------//
//                                WAT_Compound                                //
//----------------------------------------------------------------------------//

  export class WAT_Compound extends WAT_Container implements WAT_Component {
  /**** mayBeDisplaced ****/

    get mayBeDisplaced () {
      let Container = this.Container
      if (Container == null) { return false }

      let MasterInfo = MasterRegistry[Container.Master]
      if (MasterInfo == null) { return false }

      let MasterStyles = MasterInfo.Styles || {}
      return ! (
        ('left' in MasterStyles) ||
        ('width' in MasterStyles) && ('right' in MasterStyles)
      ) || ! (
        ('top' in MasterStyles) ||
        ('height' in MasterStyles) && ('bottom' in MasterStyles)
      )
    }

    set mayBeDisplaced (newSetting:boolean) { throwReadOnlyError('mayBeDisplaced') }

  /**** mayBeDeformed ****/

    get mayBeDeformed () {
      let Container = this.Container
      if (Container == null) { return false }

      let MasterInfo = MasterRegistry[Container.Master]
      if (MasterInfo == null) { return false }

      let MasterStyles = MasterInfo.Styles || {}
      return ! (
        ('width' in MasterStyles) ||
        ('left' in MasterStyles) && ('right' in MasterStyles)
      ) || !(
        ('height' in MasterStyles) ||
        ('top' in MasterStyles) && ('bottom' in MasterStyles)
      )
    }

    set mayBeDeformed (newSetting:boolean) { throwReadOnlyError('mayBeDeformed') }

  /**** Index ****/

    get Index () { return this.Container.IndexOfComponent(this) }
    set Index (newIndex:any) { throwReadOnlyError('Index') }

  /**** mayBeShiftedUp/Down ****/

    get mayBeShiftedUp () { return this.Container.CompoundMayBeShiftedUp(this) }
    set mayBeShiftedUp (newValue:any) { throwReadOnlyError('mayBeShiftedUp') }

    get mayBeShiftedDown () { return this.Container.CompoundMayBeShiftedDown(this) }
    set mayBeShiftedDown (newValue:any) { throwReadOnlyError('mayBeShiftedDown') }

  /**** mayBeShiftedTo ****/

    public mayBeShiftedTo (InsertionPoint:WAT_Control|WAT_Compound|WAT_Name|number):boolean {
      return this.Container.CompoundMayBeShiftedTo(this,InsertionPoint)
    }

  /**** shiftUp/Down ****/

    public shiftUp   ():void { this.Container.shiftCompoundUp(this) }
    public shiftDown ():void { this.Container.shiftCompoundDown(this) }

  /**** shiftTo ****/

    public shiftTo (InsertionPoint:WAT_Control|WAT_Compound|WAT_Name|number):void {
      this.Container.shiftCompoundTo(this,InsertionPoint)
    }

  /**** mayBeRemoved ****/

    get mayBeRemoved () { return this.Container.ComponentMayBeRemoved(this) }
    set mayBeRemoved (newValue:any) { throwReadOnlyError('mayBeRemoved') }

  /**** remove ****/

    public remove ():void {
      this.Container.removeCompound(this)
    }
  }

//----------------------------------------------------------------------------//
//                                WAT_Control                                 //
//----------------------------------------------------------------------------//

  export class WAT_Control extends WAT_Visual implements WAT_Component {
  /**** mayBeDisplaced ****/

    get mayBeDisplaced () {
      let Container = this.Container
      if (Container == null) { return false }

      let MasterInfo = MasterRegistry[Container.Master]
      if (MasterInfo == null) { return false }

      let MasterStyles = MasterInfo.Styles || {}
      return ! (
        ('left' in MasterStyles) ||
        ('width' in MasterStyles) && ('right' in MasterStyles)
      ) || ! (
        ('top' in MasterStyles) ||
        ('height' in MasterStyles) && ('bottom' in MasterStyles)
      )
    }

    set mayBeDisplaced (newSetting:boolean) { throwReadOnlyError('mayBeDisplaced') }

  /**** mayBeDeformed ****/

    get mayBeDeformed () {
      let Container = this.Container
      if (Container == null) { return false }

      let MasterInfo = MasterRegistry[Container.Master]
      if (MasterInfo == null) { return false }

      let MasterStyles = MasterInfo.Styles || {}
      return ! (
        ('width' in MasterStyles) ||
        ('left' in MasterStyles) && ('right' in MasterStyles)
      ) || !(
        ('height' in MasterStyles) ||
        ('top' in MasterStyles) && ('bottom' in MasterStyles)
      )
    }

    set mayBeDeformed (newSetting:boolean) { throwReadOnlyError('mayBeDeformed') }

  /**** Index ****/

    get Index () { return this.Container.IndexOfComponent(this) }
    set Index (newIndex:any) { throwReadOnlyError('Index') }

  /**** mayBeShiftedUp/Down ****/

    get mayBeShiftedUp () { return this.Container.CompoundMayBeShiftedUp(this) }
    set mayBeShiftedUp (newValue:any) { throwReadOnlyError('mayBeShiftedUp') }

    get mayBeShiftedDown () { return this.Container.CompoundMayBeShiftedDown(this) }
    set mayBeShiftedDown (newValue:any) { throwReadOnlyError('mayBeShiftedDown') }

  /**** mayBeShiftedTo ****/

    public mayBeShiftedTo (InsertionPoint:WAT_Control|WAT_Compound|WAT_Name|number):boolean {
      return this.Container.CompoundMayBeShiftedTo(this,InsertionPoint)
    }

  /**** shiftUp/Down ****/

    public shiftUp   ():void { this.Container.shiftCompoundUp(this) }
    public shiftDown ():void { this.Container.shiftCompoundDown(this) }

  /**** shiftTo ****/

    public shiftTo (InsertionPoint:WAT_Control|WAT_Compound|WAT_Name|number):void {
      this.Container.shiftCompoundTo(this,InsertionPoint)
    }

  /**** mayBeRemoved ****/

    get mayBeRemoved () { return this.Container.ComponentMayBeRemoved(this) }
    set mayBeRemoved (newValue:any) { throwReadOnlyError('mayBeRemoved') }

  /**** remove ****/

    public remove ():void {
      this.Container.removeCompound(this)
    }
  }

//----------------------------------------------------------------------------//
//                             intrinsic Masters                              //
//----------------------------------------------------------------------------//

  MasterRegistry.plainApplet = {
    Name:'plainApplet', Version:normalized(parsedVersion('1.0.0')), Category:'Applet',
    Template:'<div class="WAT Applet"></div>',
    undesignablePropertySet:Object.assign(Object.create(null),{
      Name:true, mayBeDeleted:true, Overflows:true,
      x:true,y:true, Width:true,Height:true,
      Position:true, Size:true, Geometry:true,
      horizontalAnchoring:true,verticalAnchoring:true,
      horizontalOffsets:true,verticalOffsets:true,
      minWidth:true,maxWidth:true, minHeight:true,maxHeight:true
    }),
    UsageCount:0
  }

  MasterRegistry.plainCard = {
    Name:'plainCard', Version:normalized(parsedVersion('1.0.0')), Category:'Card',
    Template:'<div class="WAT Card"></div>',
    undesignablePropertySet:Object.assign(Object.create(null),{
      x:true,y:true, Width:true,Height:true,
      Position:true, Size:true, Geometry:true,
      horizontalAnchoring:true,verticalAnchoring:true,
      horizontalOffsets:true,verticalOffsets:true,
      minWidth:true,maxWidth:true, minHeight:true,maxHeight:true
    }),
    UsageCount:0
  }

  MasterRegistry.plainOverlay = {
    Name:'plainOverlay', Version:normalized(parsedVersion('1.0.0')), Category:'Overlay',
    Template:'<div class="WAT Overlay"></div>', UsageCount:0
  }

  MasterRegistry.plainControl = {
    Name:'plainControl', Version:normalized(parsedVersion('1.0.0')), Category:'Control',
    Template:'<div class="WAT Control"></div>', UsageCount:0
  }

  MasterRegistry.plainCompound = {
    Name:'plainCompound', Version:normalized(parsedVersion('1.0.0')), Category:'Compound',
    Template:'<div class="WAT Compound"></div>', UsageCount:0
  }

/**** AppletPeersInDocument ****/

  export function AppletPeersInDocument ():HTMLElement[] {
    return filtered(
      document.body.querySelectorAll('.WAT.Applet'),
      (Peer) => {                                  // applets must not be nested
        return (closestParent(Peer as HTMLElement,'.WAT.Applet') == null)
      }
    )
  }

//----------------------------------------------------------------------------//
//                             Designer Interface                             //
//----------------------------------------------------------------------------//

  export type WAT_Designer = {
    startDesigning: (
      Applet:WAT_Applet, Target?:WAT_Visual|WAT_Name, Property?:WAT_Identifier,
      x?:number, y?:number
    ) => void,
    inhibitsEventsFrom: (Visual:WAT_Visual) => boolean     // for event handlers
  }

  let Designer:WAT_Designer

/**** registerDesigner ****/

  export function registerDesigner (newDesigner:WAT_Designer):void {
    expectPlainObject('WAT designer',newDesigner)

    if (
      ! ValueIsFunction(newDesigner.startDesigning) ||
      ! ValueIsFunction(newDesigner.inhibitsEventsFrom)
    ) throwError(
      'InvalidArgument: the given object is no valid WAT Designer'
    )

    if (Designer == null) {
      Designer = newDesigner
    } else {
      if (Designer !== newDesigner) throwError(
        'DesignerExists: another WAT Designer has already been registered'
      )
    }
  }

/**** ready - similar to jQuery.ready ****/

  let   WAT_isReady                     = false
//const ReadyFunctionsToCall:Function[] = []

  export function ready (FunctionToCall:Function):void {
    expectFunction('function to call',FunctionToCall)

    if (WAT_isReady && ! ReadyFunctionsAreRunning) {
      return FunctionToCall()                                      // may throw!
    } else {
      ReadyFunctionsToCall.push(FunctionToCall)
    }
  }

/**** invokeAllReadyFunctionsToCall - WAT is ready but applets not started ****/
// ReadyFunctionsToCall may be extended while invokeAllReadyFunctionsToCall is running!

  let ReadyFunctionsAreRunning = false

  function invokeAllReadyFunctionsToCall ():void {
    console.log('WAT is ready')

    ReadyFunctionsAreRunning = true
      for (let i = 0; i < ReadyFunctionsToCall.length; i++) {
        try {
          ReadyFunctionsToCall[i]()
        } catch (signal) {
          console.error('registered WAT "ready" handler failed with ',signal)
        }
      }
    ReadyFunctionsAreRunning = false
  }

/**** running - similar to jQuery.ready ****/

  let   WAT_isRunning                     = false
  const RunningFunctionsToCall:Function[] = []

  export function running (FunctionToCall:Function):void {
    expectFunction('function to call',FunctionToCall)

    if (WAT_isRunning && ! RunningFunctionsAreRunning) {
      return FunctionToCall()                                      // may throw!
    } else {
      RunningFunctionsToCall.push(FunctionToCall)
    }
  }

/**** invokeAllRunningFunctionsToCall - all WAT applets are running ****/
// RunningFunctionsToCall may be extended while invokeAllRunningFunctionsToCall is running!

  let RunningFunctionsAreRunning = false

  function invokeAllRunningFunctionsToCall ():void {
    console.log('WAT is running')

    RunningFunctionsAreRunning = true
      for (let i = 0; i < RunningFunctionsToCall.length; i++) {
        try {
          RunningFunctionsToCall[i]()
        } catch (signal) {
          console.error('registered WAT "running" handler failed with ',signal)
        }
      }
    RunningFunctionsAreRunning = false
  }

//----------------------------------------------------------------------------//
//                                WAT Start-Up                                //
//----------------------------------------------------------------------------//

/**** startWAT ****/

  async function startWAT ():Promise<void> {
    WAT_isReady = true
    invokeAllReadyFunctionsToCall()

    await startAllApplets()

    WAT_isRunning = true
    invokeAllRunningFunctionsToCall()
  }

/**** startAllApplets ****/

  async function startAllApplets ():Promise<void> {
    let AppletPeerList = AppletPeersInDocument()
    await AppletPeerList.forEach(async function (AppletPeer:HTMLElement) {
      await startAppletFromPeer(AppletPeer)
    })
  }

/**** startAppletFromPeer ****/

  async function startAppletFromPeer (AppletPeer:HTMLElement):Promise<void> {
    let Applet
    if (BackupIsSupported && await AppletHasBackup(AppletPeer)) {
      Applet = await AppletRestoredIntoPeer(AppletPeer)
    } else {
      Applet = VisualBuiltFromPeer(AppletPeer,'Applet') // act. makes the applet
    }

    Applet.trigger('applet-started',Applet)
  }

/**** start WAT and applets ****/

  function startup () {
    defineForbiddenPropertyNames()
    registerMastersInDocument()            // nota bene: WAT is not yet "ready"!

    installEventHandlerForErrorIndicators()

    if (BackupIsSupported) {
      localforage.ready(function () {
        AppletStore = localforage.createInstance({
          name:'WAT Applets'
        })

        startWAT()
      })
    } else {
      startWAT()
    }
  }

/**** wait for the proper trigger to start WAT ****/

  if (
    (document.readyState === 'complete') ||
    (document.readyState === 'interactive')
  ) {
    setTimeout(startup, 1)
  } else {
    window.addEventListener('DOMContentLoaded', startup)
  }

