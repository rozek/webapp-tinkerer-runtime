/*******************************************************************************
*                                                                              *
*                        WebApp Tinkerer (WAT) Runtime                         *
*                                                                              *
*******************************************************************************/

import $           from 'jquery'
import download    from 'downloadjs'
import localforage from 'localforage'
import {
  global, throwError, quoted,
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
  type WAT_normalizedVersion = {                           // not to be exported
    major:number, minor:number, Patch:number, Build:number
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

/**** throwReadOnlyError ****/

  export function throwReadOnlyError (Name:WAT_Name):void {
    throwError(
      'ReadOnlyProperty: property ' + quoted(Name) + ' must not be set'
    )
  }

/**** throwWriteOnlyError ****/

  export function throwWriteOnlyError (Name:WAT_Name):void {
    throwError(
      'WriteOnlyProperty: property ' + quoted(Name) + ' must not be read'
    )
  }

/**** KeySetOf ****/

  function KeySetOf (KeyList:string[]):{} {
    let Result = Object.create(null)
      KeyList.forEach(Key => Result[Key] = Key)
    return Result
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
    Version:WAT_SemVer, toBeNormalized:boolean = true
  ):WAT_Version {
    let MatchList = VersionPattern.exec(Version) as string[]
      let major = parseInt(MatchList[1],10)
      let minor = (MatchList[2] == null ? undefined : parseInt(MatchList[2],10))
      let Patch = (MatchList[3] == null ? undefined : parseInt(MatchList[3],10))
      let Build = (MatchList[4] == null ? undefined : parseInt(MatchList[4].slice(1),16))
    if (toBeNormalized) {
      minor = minor || 0
      Patch = Patch || ((major === 0) && (minor === 0) ? 1 : 0)
      Build = 1
    }

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
    VersionA:WAT_Version, VersionB:WAT_Version
  ):boolean {
    return (
       (VersionA.major       ===  VersionB.major) &&
      ((VersionA.minor || 0) === (VersionB.minor || 0)) &&
      ((VersionA.Patch || 0) === (VersionB.Patch || 0)) &&
      ((VersionA.Build || 1) === (VersionB.Build || 1))
    )
  }

/**** VersionAgtB ****/

  function VersionAgtB (
    VersionA:WAT_Version, VersionB:WAT_Version
  ):boolean {
    return (
      (VersionA.major  >  VersionB.major) ||
      (VersionA.major === VersionB.major) && (
        ((VersionA.minor || 0)  >  (VersionB.minor || 0)) ||
        ((VersionA.minor || 0) === (VersionB.minor || 0)) && (
          ((VersionA.Patch || 0)  >  (VersionB.Patch || 0)) ||
          ((VersionA.Patch || 0) === (VersionB.Patch || 0)) &&
            ((VersionA.Build || 1)  >  (VersionB.Build || 1))
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
