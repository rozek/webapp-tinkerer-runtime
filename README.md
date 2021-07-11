# webapp-tinkerer-runtime #

Runtime for the WebApp Tinkerer

Build modern Web Applications from Components, live in your Browser, supported by a visual Editor.

*(currently under active development, please stay tuned)*

## WebApp Tinkerer API ##

Apart from the types and values shown below, the `webapp-tinkerer-runtime` also re-exports all functions from the [javascript-interface-library](https://github.com/rozek/javascript-interface-library)

### additional Classification and Validation Functions ###

As in the `javascript-interface-library`, the following classification functions `ValueIsXXX` are accompanied by their corresponding validation functions `allowXXX`, `allwoedXXX`, `expectXXX` and `expectedXXX`:

* **`ValueIsElement (Value:any):boolean`**<br>returns `true` if the given `Value` is a DOM element - or `false` otherwise
* **`ValueIs$Instance (Value:any):boolean`**<br>returns `true` if the given `Value` is a jQuery collection - or `false` otherwise
* **`ValueIsVisual (Value:any):boolean`**<br>returns `true` if the given `Value` is a `WAT_Visual` - or `false` otherwise
* **`ValueIsApplet (Value:any):boolean`**<br>returns `true` if the given `Value` is a `WAT_Applet` - or `false` otherwise
* **`ValueIsCard (Value:any):boolean`**<br>returns `true` if the given `Value` is a `WAT_Card` - or `false` otherwise
* **`ValueIsOverlay (Value:any):boolean`**<br>returns `true` if the given `Value` is a `WAT_Overlay` - or `false` otherwise
* **`ValueIsControl (Value:any):boolean`**<br>returns `true` if the given `Value` is a `WAT_Control` - or `false` otherwise
* **`ValueIsCompound (Value:any):boolean`**<br>returns `true` if the given `Value` is a `WAT_Compound` - or `false` otherwise
* **`ValueIsComponent (Value:any):boolean`**<br>returns `true` if the given `Value` is a `WAT_Component` - or `false` otherwise
* **`ValueIsContainer (Value:any):boolean`**<br>returns `true` if the given `Value` is a `WAT_Container` - or `false` otherwise
* **`ValueIsUniqueId (Value:any):boolean`**<br>returns `true` if the given `Value` looks like a unique WAT id - or `false` otherwise
* **`ValueIsId (Value:any):boolean`**<br>returns `true` if the given `Value` looks like a valid HTML id - or `false` otherwise
* **`ValueIsName (Value:any):boolean`**<br>returns `true` if the given `Value` may be used as a WAT name - or `false` otherwise
* **`ValueIsUniversalName (Value:any):boolean`**<br>returns `true` if the given `Value` may be used as a "universal name" for reactive statements - or `false` otherwise
* **`ValueIsLabel (Value:any):boolean`**<br>returns `true` if the given `Value` may be used as a WAT label - or `false` otherwise
* **`ValueIsIdentifier (Value:any):boolean`**<br>returns `true` if the given `Value` looks like a valid JavaScript identifier (containing ASCII characters, decimal digits, `$` and `_` only) - or `false` otherwise
* **`ValueIsLocation (Value:any):boolean`**<br>returns `true` if the given `Value` may be used to specify the position of a WAT visual - or `false` otherwise
* **`ValueIsDimension (Value:any):boolean`**<br>returns `true` if the given `Value` may be used to specify the size of a WAT visual - or `false` otherwise
* **`ValueIsSemVer (Value:any):boolean`**<br>returns `true` if the given `Value` looks like a [SemVer](https://semver.org/)-compliant version specification - or `false` otherwise

### Resource Handling ###

"Resources" are HTML markup for internal or external stylesheets and scripts needed by a given master to fulfill its operation. Resources may be added and removed at runtime (as far as that is technically possible) and, thus, *should* be identified by an id

* **`registerResources (Resources:string):void`**<br>adds any resources given in `Resources` to the current HTML document - unless they already have been registered before (it is allowed to add an already existing resource - such a request is simply ignored)
* **`unregisterResources (Resources:string):void`**<br>removes any resources given in `Resources` from the current HTML document (as far as that is technically possible) - provided that they still exist (it is allowed to remove a missing resource - such a request is simply ignored)

### Backup Handling ###

`webapp-tinkerer-runtime` uses [localforage](https://github.com/localForage/localForage) to store snapshots of an applet within a browser's storage area. This prevents changes from getting lost if a browser is accidentally closed, the web page containing an applet is refreshed, the system is restarted etc. However, it is not a really *safe* way to store an applet (as browsers usually provide mechanisms for the users to wipe their storage area) - only an export to the local file system can help here.

By default, `localforage` is not part of the `webapp-tinkerer-runtime`: if the described backup is desired, `localforage` has to be loaded separately.

* **`AppletsMayBePreserved ():boolean`**<br> returns `true` if `localforage` has been loaded and seems operational - or `false` otherwise
* **`AppletMayBePreserved (Applet:WAT_Applet):boolean`**<br> returns `true` if `AppletsMayBePreserved` and the given `Applet` supports that feature - or `false` otherwise
* **`AppletHasBackup (AppletOrPeer:WAT_Applet|JQuery):Promise<boolean>`**<br> returns a promise resolving to `true` if `AppletsMayBePreserved` and the browser's storage area already contains a backup for the given `Applet` - or to `false` otherwise
* **`preserveApplet (Applet:WAT_Applet):Promise<void>`**<br>starts writing a backup of the current state of the given `Applet` into the browser's storage area - provided that the applet may be preserved. Any previously stored backup of the same applet is overwritten. Note: `preserveApplet` must not be called again while a previous backup operation is still in progress
* **`restoreApplet (Applet:WAT_Applet, CollisionHandling:WAT_CollisionHandling):Promise<void>`**<br>replaces the given `Applet` in the browser's DOM with a previously written backup from the browser's storage area (if one exists, otherwise the original applet remains untouched)
* **`removeBackupOfApplet (Applet:WAT_Applet):Promise<void>`**<br>removes a previously written backup of the given `Applet` from the browser's storage area

### Serialization and Deserialization ###

"Serializations" of whole applets or individual visuals are the HTML markup needed to restore them (or make copies). They may contain any required masters and resources or go without them.

* **`serializedMaster (Master:WAT_Name, withPendingSettings?:'withPendingSettings'):string`**<br>serializes the given `Master` into a string. If `withPendingSettings` is set to `"withPendingSettings"`, pending settings are included in the serialization, otherwise they are not
* **`parsedSerialization (Serialization:string):WAT_parsedSerialization`**<br>parses a given `Serialization` into its parts (i.e., the contained serialized resources, masters, applets, cards, overlays and components)
* **`deserializedMaster (Serialization:string):WAT_MasterInfo`**<br>deserializes a given `Serialization` and returns a description record for the contained master 
* **`AppletDeserializedFrom(oldApplet:WAT_Applet, Serialization:string):WAT_Applet`**<br>deserializes a given `Serialization` (which must contain a WAT applet) and uses the result to replace the given `oldApplet`
* **`deserializeCardInto (Serialization:string, Applet:WAT_Applet, Index:number):void`**<br>deserializes a given `Serialization` (which must contain a WAT card) and inserts the result into the given `Applet` at the given `Index`
* **`deserializeOverlayInto (Serialization:string, Applet:WAT_Applet, Index:number):void`**<br>deserializes a given `Serialization` (which must contain a WAT overlay) and inserts the result into the given `Applet` at the given `Index`
* **`deserializeComponentInto (Serialization:string, Container:WAT_Container, Index:number):void`**<br>deserializes a given `Serialization` (which must contain a WAT component) and inserts the result into the given `Container` at the given `Index`

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
* `WAT_parsedSerialization`<br>&nbsp;<br>
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
