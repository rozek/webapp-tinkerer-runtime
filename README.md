# webapp-tinkerer-runtime #

Runtime for the WebApp Tinkerer

Build modern Web Applications from Components, live in your Browser, supported by a visual Editor.

*(currently under active development, please stay tuned)*

## WebApp Tinkerer API ##

Apart from the types and values shown below, the `webapp-tinkerer-runtime` also re-exports all functions from the [javascript-interface-library](https://github.com/rozek/javascript-interface-library)

### additional Classification and Validation Functions ###

* **`ValueIsElement (Value:any):boolean`**
* **`ValueIs$Instance (Value:any):boolean`**
* **`ValueIsVisual (Value:any):boolean`**<br>returns `true` if the given argument is a `WAT_Visual` - or `false` otherwise
* **`ValueIsApplet (Value:any):boolean`**<br>returns `true` if the given argument is a `WAT_Applet` - or `false` otherwise
* **`ValueIsCard (Value:any):boolean`**<br>returns `true` if the given argument is a `WAT_Card` - or `false` otherwise
* **`ValueIsOverlay (Value:any):boolean`**<br>returns `true` if the given argument is a `WAT_Overlay` - or `false` otherwise
* **`ValueIsControl (Value:any):boolean`**<br>returns `true` if the given argument is a `WAT_Control` - or `false` otherwise
* **`ValueIsCompound (Value:any):boolean`**<br>returns `true` if the given argument is a `WAT_Compound` - or `false` otherwise
* **`ValueIsComponent (Value:any):boolean`**<br>returns `true` if the given argument is a `WAT_Component` - or `false` otherwise
* **`ValueIsContainer (Value:any):boolean`**<br>returns `true` if the given argument is a `WAT_Container` - or `false` otherwise
* **`ValueIsUniqueId (Value:any):boolean`**
* **`ValueIsId (Value:any):boolean`**
* **`ValueIsName (Value:any):boolean`**
* **`ValueIsUniversalName (Value:any):boolean`**
* **`ValueIsLabel (Value:any):boolean`**
* **`ValueIsIdentifier (Value:any):boolean`**
* **`ValueIsLocation (Value:any):boolean`**
* **`ValueIsDimension (Value:any):boolean`**
* **`ValueIsSemVer (Value:any):boolean`**

### Resource Handling ###

* `registerResources`
* `unregisterResources`

### Backup Handling ###

* `AppletsMayBePreserved`
* `AppletMayBePreserved`
* `AppletHasBackup`
* `preserveApplet`
* `restoreApplet`
* `removeBackupOfApplet`

### Serialization and Deserialization ###

* `serializedMaster`
* `parsedSerialization`
* `deserializedMaster`
* `AppletDeserializedFrom`
* `deserializeCardInto`
* `deserializeOverlayInto`
* `deserializeComponentInto`

### Master Management ###

* `registerMasterFromSerialization`
* `hasMaster`
* `lacksMaster`
* `createMaster`
* `DuplicateOfMaster`
* `renameMaster`
* `NameOfMaster`
* `setNameOfMaster`
* `CategoryOfMaster`
* `VersionOfMaster`
* `setVersionOfMaster`
* `ResourcesOfMaster`
* `pendingResourcesOfMaster`
* `setPendingResourcesOfMaster`
* `activatePendingResourcesOfMaster`
* `TemplateOfMaster`
* `pendingTemplateOfMaster`
* `setPendingTemplateOfMaster`
* `activatePendingTemplateOfMaster`
* `ClassesOfMaster`
* `pendingClassesOfMaster`
* `setPendingClassesOfMaster`
* `activatePendingClassesOfMaster`
* `StylesOfMaster`
* `pendingStylesOfMaster`
* `setPendingStylesOfMaster`
* `activatePendingStylesOfMaster`
* `ScriptOfMaster`
* `pendingScriptOfMaster`
* `setPendingScriptOfMaster`
* `activatePendingScriptOfMaster`
* `PropertiesOfMaster`
* `PropertyNamesOfMaster`
* `PropertyOfMaster`
* `MasterHasProperty`
* `MasterLacksProperty`
* `insertPropertyOfMasterAt`
* `renamePropertyOfMaster`
* `changePropertyOfMaster`
* `IndexOfPropertyOfMaster`
* `PropertyCountOfMaster`
* `PropertyOfMasterMayBeMovedUp`
* `PropertyOfMasterMayBeMovedDown`
* `movePropertyOfMasterToTop`
* `movePropertyOfMasterUp`
* `movePropertyOfMasterDown`
* `movePropertyOfMasterToBottom`
* `movePropertyOfMasterTo`
* `removePropertyOfMaster`
* `ErrorInfoOfMaster`
* `UsageCountOfMaster`
* `Masters`
* `instantiableMasters`
* `instantiableLayerMasters`
* `instantiableComponentMasters`

### Error Information Handling ###

### Miscellaneous ###

* `Version`
* `throwReadOnlyError`
* `throwWriteOnlyError`
* `ready`
* `running`
* `newUniqueId`
* `VisualForElement`
* `AppletPeersInDocument`
* `registerDesigner`

### exported Types, Classes and related Values ###

The following exports are for TypeScript users only, JavaScript users may simply ignore them.

* `WAT_Categories`
* `WAT_Category`<br>&nbsp;<br>
* `WAT_SemVer`<br>&nbsp;<br>
* `WAT_Name`
* `WAT_Label`
* `WAT_Identifier`
* `WAT_Location`
* `WAT_Dimension`
* `WAT_Position`
* `WAT_Size`
* `WAT_Geometry`<br>&nbsp;<br>
* `WAT_horizontalAnchorings`
* `WAT_horizontalAnchoring`
* `WAT_verticalAnchorings`
* `WAT_verticalAnchoring`
* `WAT_horizontalOffsets`
* `WAT_verticalOffsets`<br>&nbsp;<br>
* `WAT_FontWeights`
* `WAT_FontWeight`<br>&nbsp;<br>
* `WAT_FontStyles`
* `WAT_FontStyle`<br>&nbsp;<br>
* `WAT_TextDecorationLines`
* `WAT_TextDecorationLine`
* `WAT_TextDecorationStyles`
* `WAT_TextDecorationStyle`
* `WAT_TextDecoration`<br>&nbsp;<br>
* `WAT_TextShadow`<br>&nbsp;<br>
* `WAT_TextAlignments`
* `WAT_TextAlignment`<br>&nbsp;<br>
* `WAT_BackgroundModes`
* `WAT_BackgroundMode`
* `WAT_BackgroundTexture`<br>&nbsp;<br>
* `WAT_BorderStyles`
* `WAT_BorderStyle`<br>&nbsp;<br>
* `WAT_BoxShadow`<br>&nbsp;<br>
* `WAT_Cursors`
* `WAT_Cursor`
* `WAT_customCursor`<br>&nbsp;<br>
* `WAT_Overflows`
* `WAT_Overflow`<br>&nbsp;<br>
* `WAT_TextOverflows`
* `WAT_TextOverflow`<br>&nbsp;<br>
* `WAT_Text`
* `WAT_Textline`
* `WAT_Color`
* `WAT_URL`
* `WAT_Id`<br>&nbsp;<br>
* `WAT_PropertyEditorTypes`
* `WAT_PropertyEditorType`
* `WAT_Property`<br>&nbsp;<br>
* `WAT_ErrorInfo` - incorrect visuals are flagged with a non-empty error information record containing the type of error and other details needed to directly jump into a designer in order to correct the mistake. For the user, such visuals display an error indicator which may be clicked (or tapped) in order to reveal an error message<br>&nbsp;<br>
* `WAT_Visual` - the generic superclass of all visual elements
* `WAT_Applet` - represents a single WAT Applet. A web page may contain multiple such applets, but they must not be nested
* `WAT_Container` - a "container" is a visual which may contain inner "components". Cards, overlays and compounds are containers
* `WAT_Layer` - "layers" are the direct descendants of an applet. Cards and overlays are layers
* `WAT_Card` - "cards" are direct descendants of an applet, covering its whole visible area. Applets must contain one card, at least, but usally they contain multiple of them. Only one card may be visible at any time
* `WAT_Overlay` - "overlays" are direct descendants of an applet. In contrast to a "card", an overlay may have an arbitrary size and position and multiple overlays may be visible simultaneously. Overlays are commonly used to implement dialogs, palettes, toasts, menues and similar
* `WAT_Component` - "components" are the building blocks of cards and overlays. They often represent a single user interface element and may contain other components themselves
* `WAT_Compound` - "compounds" are nested controls, i.e. controls which contain inner controls
* `WAT_Control` - a "control" represents a single (perhaps nested) HTML element. Many controls are HTML `input` elements, but `div`s and `span`s are possible as well<br>&nbsp;<br>
* `WAT_Designer` - users may provide their own custom "Designer", this is the interface any Designer must adhere to

## Build Instructions ##

You may easily build this package yourself.

Just install [NPM](https://docs.npmjs.com/) according to the instructions for your platform and follow these steps:

1. either clone this repository using [git](https://git-scm.com/) or [download a ZIP archive](https://github.com/rozek/webapp-tinkerer-runtime/archive/refs/heads/main.zip) with its contents to your disk and unpack it there
2. open a shell and navigate to the root directory of this repository
3. run `npm install` in order to install the complete build environment
4. execute `npm run build` to create a new build

See the author's [build-configuration-study](https://github.com/rozek/build-configuration-study) for a general description of his build environment.

## License ##

[MIT License](LICENSE.md)
