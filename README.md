# webapp-tinkerer-runtime #

Runtime for the WebApp Tinkerer

Build modern Web Applications from Components, live in your Browser, supported by an intuitive visual Editor.

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

"Resources" are HTML markup for internal or external stylesheets and scripts needed by a given master to fulfill its operation. Resources may be added and removed at runtime (as far as that is technically possible) and, thus, *should* be identified by an HTML id

* **`registerResources (Resources:string):void`**<br>adds any resources given in `Resources` to the current HTML document - unless they already have been registered before (it is allowed to add an already existing resource again - such a request is simply ignored)
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
* **`deserializedMaster (Serialization:string):WAT_MasterInfo`**<br>deserializes a given `Serialization` and returns a description record for the contained master (without registering it, however)
* **`AppletDeserializedFrom(oldApplet:WAT_Applet, Serialization:string):WAT_Applet`**<br>deserializes a given `Serialization` (which must contain a WAT applet) and uses the result to replace the given `oldApplet`
* **`deserializeCardInto (Serialization:string, Applet:WAT_Applet, Index:number):void`**<br>deserializes a given `Serialization` (which must contain a WAT card) and inserts the result into the given `Applet` at the given `Index`
* **`deserializeOverlayInto (Serialization:string, Applet:WAT_Applet, Index:number):void`**<br>deserializes a given `Serialization` (which must contain a WAT overlay) and inserts the result into the given `Applet` at the given `Index`
* **`deserializeComponentInto (Serialization:string, Container:WAT_Container, Index:number):void`**<br>deserializes a given `Serialization` (which must contain a WAT component) and inserts the result into the given `Container` at the given `Index`

### Master Management ###

"Masters" define common properties and methods for visuals of a given "Category" (such as `Applet`, `Card`, `Overlay`, `Control` or `Compound`). Any master has a "Name" which must be unique within a HTML document and is kept in a "master registry" such that any master may be looked up by its name.

* **`registerMasterFromSerialization (Serialization:string):void`**<br>deserializes a given `Serialization` (which must contain a serialized master) and adds it to the registry - provided that the given master does not yet exist (otherwise, an error is thrown)
* **`hasMaster (Name:WAT_Name):boolean`**<br>returns `true` if a master called `Name` is "known" (i.e., has been registered before) - or `false` otherwise
* **`lacksMaster (Name:WAT_Name):boolean`**<br>returns `true` if a master called `Name` is *not* "known" (i.e., has never been registered before or already removed from the registry again) - or `false` otherwise
* **`createMaster (Name:WAT_Name, Category:WAT_Category, Version?:WAT_SemVer, Template?:WAT_Text):void`**<br>creates a new master with the (not yet registered) `Name`, provided for visuals of the given `Category` and of the optionally given `Version` (defaulting to `'0.1.0'`) and with the optional HTML `Template` (defaulting to nothing) and adds it to the master registry
* **`DuplicateOfMaster (oldName:WAT_Name, newName:WAT_Name, newVersion?:WAT_normalizedVersion):WAT_MasterInfo`**<br>creates a duplicate of the master called `oldName` and registers it under the given `newName` (provided that the master registry does not yet contain another master called `newName`). If specified, the duplicate's version is set to `newVersion` (which may be lower than that of the original master)
* **`renameMaster (oldName:WAT_Name, newName:WAT_Name, updateInstances:boolean = true):void`**<br>renames the master called `oldName` to `newName` (provided that the master registry does not yet contain another master called `newName`). If `updateInstances` is missing or is set to `true`, all visuals using master `oldName` will be switched to `newName` - otherwise, their old master setting is kept (leading to error indicators for them as a master called `oldName` will no longer be available). Intrinsic (i.e., built-in) masters must not be renamed
* **`NameOfMaster (Name:WAT_Name):WAT_Name`**<br>returns the name of a master called `Name` - i.e., it will either return the argument itself or throw an error if a master with the given `Name` does not exist in the master registry
* **`setNameOfMaster (oldName:WAT_Name, newName:WAT_Name):void`**<br>changes the name of the master called `oldName` (which must exist in the master registry, otherwise an error is thrown) to `newName` and updates all visuals using this master accordingly. Intrinsic (i.e., built-in) masters must not be renamed
* **`CategoryOfMaster (Name:WAT_Name):WAT_Category`**<br>returns the "category" configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown)
* **`VersionOfMaster (Name:WAT_Name):WAT_SemVer`**<br>returns the version of the master called `Name` (which must exist in the master registry, otherwise an error is thrown) in [SemVer](https://semver.org/) format
* **`setVersionOfMaster (Name:WAT_Name, newSemVer:WAT_SemVer):void`**<br>changes the version of the master called `Name` (which must exist in the master registry, otherwise an error is thrown) to `newSemVer` (which must be greater than or equal to the master's current version). The version of intrinsic (i.e., built-in) masters must not be changed
* **`ResourcesOfMaster (Name:WAT_Name):WAT_Text|undefined`**<br>returns the resources configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown)
* **`pendingResourcesOfMaster (Name:WAT_Name):WAT_Text|undefined`**<br>returns the pending resources configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown)
* **`setPendingResourcesOfMaster (Name:WAT_Name, newResources?:WAT_Text):void`**<br>changes the pending resources configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown) to `newResources`. If `newResources` is missing, undefined or an empty string, pending resources are removed. The resources of intrinsic (i.e., built-in) masters must not be changed
* **`activatePendingResourcesOfMaster (Name:WAT_Name):void`**<br>"activates" the pending resources configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown). I.e., previously active resources are removed and pending ones become active and get installed. The resources of intrinsic (i.e., built-in) masters must not be changed
* **`TemplateOfMaster (Name:WAT_Name):WAT_Text | undefined`**<br>returns the HTML template configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown)
* **`pendingTemplateOfMaster (Name:WAT_Name):WAT_Text | undefined`**<br>returns the pending HTML template configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown)
* **`setPendingTemplateOfMaster (Name:WAT_Name, newTemplate?:WAT_Text):void`**<br>changes the pending HTML template configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown) to `newTemplate`. If `newTemplate` is missing, undefined or an empty string, the pending template is removed. The template of intrinsic (i.e., built-in) masters must not be changed
* **`activatePendingTemplateOfMaster (Name:WAT_Name):void`**<br>"activates" the pending HTML template configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown): the pending template becomes the active one, but already existing visuals using master `Name` will *not* get updated. The template of intrinsic (i.e., built-in) masters must not be changed
* **`ClassesOfMaster (Name:WAT_Name):WAT_Text`**<br>returns the CSS classes configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown). Whenever the CSS classes of a visual are changed using a WAT function (i.e., not by jQuery itself), WAT guarantees, that the CSS classes configured for their master remain present
* **`pendingClassesOfMaster (Name:WAT_Name):WAT_Text`**<br>returns the pending CSS classes configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown)
* **`setPendingClassesOfMaster (Name:WAT_Name, newClasses?:WAT_Text):void`**<br>changes the pending CSS classes configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown) to `newClasses`. If `newClasses` is missing, undefined or an empty string, the pending CSS classes are removed. The CSS classes of intrinsic (i.e., built-in) masters must not be changed
* **`activatePendingClassesOfMaster (Name:WAT_Name):void`**<br>"activates" the pending CSS classes configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown): the pending CSS classes become the active ones and any already existing visuals using master `Name` will be updated accordingly. The CSS classes of intrinsic (i.e., built-in) masters must not be changed
* **`StylesOfMaster (Name:WAT_Name):WAT_Text`**<br>returns a copy of the CSS styles configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown). Whenever the CSS styles of a visual are changed using a WAT function (i.e., not by jQuery itself), WAT guarantees, that the CSS styles configured for their master remain untouched
* **`pendingStylesOfMaster (Name:WAT_Name):WAT_Text`**<br>returns the pending CSS styles configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown)
* **`setPendingStylesOfMaster (Name:WAT_Name, newStyles?:WAT_Text):void`**<br>changes the pending CSS styles configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown) to `newStyles`. If `newStyles` is missing, undefined or an empty string, the pending CSS styles are removed. The CSS styles of intrinsic (i.e., built-in) masters must not be changed
* **`activatePendingStylesOfMaster (Name:WAT_Name):void`**<br>"activates" the pending CSS styles configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown): the pending CSS styles become the active ones and any already existing visuals using master `Name` will be updated accordingly. The CSS styles of intrinsic (i.e., built-in) masters must not be changed
* **`ScriptOfMaster (Name:WAT_Name):WAT_Text | undefined`**<br>returns the script configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown). Whenever a visual with the given master is created or deserialized or that visual's own script is changed, the master's script is executed for the given visual before the visual's own script runs
* **`pendingScriptOfMaster (Name:WAT_Name):WAT_Text | undefined`**<br>returns the pending script configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown)
* **`setPendingScriptOfMaster (Name:WAT_Name, newScript?:WAT_Text):void`**<br>returns the pending script configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown). The script of intrinsic (i.e., built-in) masters must not be changed
* **`activatePendingScriptOfMaster (Name:WAT_Name):void`**<br>"activates" the pending script configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown): the pending script become the active ones and any already existing visuals using master `Name` will be refreshed. The script of intrinsic (i.e., built-in) masters must not be changed
* **`PropertiesOfMaster (Name:WAT_Name):WAT_Property[]`**<br>returns a list with the descriptors of all properties configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown). In addition to any built-in properties, a master can specify additional (or different) properties for its instances
* **`PropertyNamesOfMaster (Name:WAT_Name):WAT_Identifier[]`**<br>returns a list with the identifiers of all properties configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown)
* **`PropertyOfMaster (Name:WAT_Name, Identifier:WAT_Identifier):WAT_Property | undefined`**<br>returns a descriptor for the property with the name `Identifier` configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown) - or `undefined`, if such a property does not exist
* **`MasterHasProperty (Name:WAT_Name, Identifier:WAT_Identifier):boolean`**<br>returns `true`, if a property with the name `Identifier` has been configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown) - or `false`, if such a property does not exist
* **`MasterLacksProperty (Name:WAT_Name, Identifier:WAT_Identifier):boolean`**<br>returns `true`, if no property with the name `Identifier` has been configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown) - or `false`, if such a property does exist
* **`insertPropertyOfMasterAt (Name:WAT_Name, Specification:WAT_Property, Index?:number):void`**<br>inserts a new property defined by the given `Specification` into the list of properties configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown) at the given `Index`. If `Index` is missing, the new property is simply appended. The properties of intrinsic (i.e., built-in) masters must not be changed
* **`renamePropertyOfMaster (Name:WAT_Name, oldIdentifier:WAT_Identifier, newIdentifier:WAT_Identifier):void`**<br>renames the property with the name `oldIdentifier` configured for the master called `Name` into `newIdentifier`. Both master and property must exist - otherwise an error is thrown. On the other hand, a property called `newIdentifier` must not yet exist in the master. The properties of intrinsic (i.e., built-in) masters must not be changed
* **`changePropertyOfMaster (Name:WAT_Name, Identifier:WAT_Identifier, Specification:WAT_Property):void`**<br>changes the specification for a property with the name `Identifier` configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown) to the given `Specification`. The properties of intrinsic (i.e., built-in) masters must not be changed
* **`IndexOfPropertyOfMaster (Name:WAT_Name, Identifier:WAT_Identifier):number`**<br>returns the index of the property with the name `Identifier` configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown) within the list of that master's configured properties
* **`PropertyCountOfMaster (Name:WAT_Name):number`**<br>returns the number of properties configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown)
* **`PropertyOfMasterMayBeMovedUp (Name:WAT_Name, Identifier:WAT_Identifier):boolean`**<br>returns `true` if the property with the name `Identifier` configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown) may be moved "up" (i.e., towards lower indices) within the list of that master's configured properties
* **`PropertyOfMasterMayBeMovedDown (Name:WAT_Name, Identifier:WAT_Identifier):boolean`**<br>returns `true` if the property with the name `Identifier` configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown) may be moved "down" (i.e., towards higher indices) within the list of that master's configured properties
* **`movePropertyOfMasterToTop (Name:WAT_Name, Identifier:WAT_Identifier):void`**<br>moves the property with the name `Identifier` configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown) to the "top" (i.e., the beginning) of the list of that master's configured properties. The properties of intrinsic (i.e., built-in) masters must not be changed
* **`movePropertyOfMasterUp (Name:WAT_Name, Identifier:WAT_Identifier):void`**<br>moves the property with the name `Identifier` configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown) one position "up" (i.e., towards lower indices) of the list of that master's configured properties. The properties of intrinsic (i.e., built-in) masters must not be changed
* **`movePropertyOfMasterDown (Name:WAT_Name, Identifier:WAT_Identifier):void`**<br>moves the property with the name `Identifier` configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown) one position "down" (i.e., towards higher indices) of the list of that master's configured properties. The properties of intrinsic (i.e., built-in) masters must not be changed
* **`movePropertyOfMasterToBottom (Name:WAT_Name, Identifier:WAT_Identifier):void`**<br>moves the property with the name `Identifier` configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown) to the "bottom" (i.e., the end) of the list of that master's configured properties. The properties of intrinsic (i.e., built-in) masters must not be changed
* **`movePropertyOfMasterTo (Name:WAT_Name, Identifier:WAT_Identifier, newIndex:number):void`**<br>moves the property with the name `Identifier` configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown) to the given `newIndex` within the list of that master's configured properties. The properties of intrinsic (i.e., built-in) masters must not be changed
* **`removePropertyOfMaster (Name:WAT_Name, Identifier:WAT_Identifier):void`**<br>removes the property with the name `Identifier` configured for the master called `Name` (which must exist in the master registry, otherwise an error is thrown). It is permitted to remove a non-existing property. The properties of intrinsic (i.e., built-in) masters must not be changed
* **`ErrorInfoOfMaster (Name:WAT_Name):WAT_ErrorInfo | undefined`**<br>returns the current error information record for the master called `Name` (which must exist in the master registry, otherwise an error is thrown) - or `undefined` if no such record exists
* **`UsageCountOfMaster (Name:WAT_Name):number`**<br>returns the number of visuals using a master called `Name`. Important: that master does not have to be present in the master registry. I.e., the function may also be used to see how many visuals use a missing master
* **`Masters ():WAT_Name[]`**<br>contains a list with (copies of) the descriptors of all currently registered masters
* **`instantiableMasters ():WAT_Name[]`**<br>contains a list with the names of all currently registered "instantiable" masters (a master is "instantiable" if it is not a master for an applet)
* **`instantiableLayerMasters ():WAT_Name[]`**<br>contains a list with the names of all currently registered masters for cards and overlays
* **`instantiableComponentMasters ():WAT_Name[]`**<br>contains a list with the names of all currently registered masters for components (i.e., controls and compounds)
* **`missingMasters ():WAT_Name[]`**<br>contains a list with the names of all (non-intrinsic) masters, which have been requested by some visuals but not yet registered
* **`unusedMasters ():WAT_Name[]`**<br>contains a list with the names of all currently registered masters which are not currently used by any visuals
* **`MastersUsedByVisuals (VisualList:WAT_Visual[], withoutIntrinsics?:'withoutIntrinsics'):WAT_Name[]`**<br>contains a list with the names of all masters which have been requested by the given `VisualList`. By default, this list also includes the names of any intrinsic (i.e., built-in) masters - unless `withoutIntrinsics` is set to `'withoutIntrinsics'`

### Miscellaneous ###

* **`Version:WAT_SemVer`**<br>contains the current version of the `webapp-tinkerer-runtime`
* **`throwReadOnlyError (Name:WAT_Name):never`**<br>throws an error indicating that property `Name` may only be read
* **`throwWriteOnlyError (Name:WAT_Name):never`**<br>throws an error indicating that property `Name` may only be written
* **`ready (FunctionToCall:Function):void`**<br>registers `FunctionToCall` to be called as soon as the DOM has been loaded and is ready to be worked with. If the DOM has already been loaded, `FunctionToCall` will be immediately invoked
* **`running (FunctionToCall:Function):void`**<br>registers `FunctionToCall` to be called as soon as all applets found in the current HTML document are running. If this is already the case, `FunctionToCall` will be immediately invoked
* **`newUniqueId ():number`**<br>returns a new id which is unique among all WAT applets in the current HTML document
* **`VisualForElement (Element:HTMLElement):WAT_Visual`**<br>returns the closest WAT visual containing the given `Element` - or `undefined` if such a visual does not exist
* **`AppletPeersInDocument ():JQuery`**<br>returns the DOM elements of all WAT applets found in the current HTML document in a single jQuery collection
* **`registerDesigner (newDesigner:WAT_Designer):void`**<br>registers `newDesigner` as the WAT designer to be used - unless such a designer has already been registered before

### WAT_Visual ###

`abstract class WAT_Visual`<br>

"WAT_Visual" is the generic superclass of all visual WAT elements.

Any `WAT_Visual` offers the following properties and methods:

* **`uniqueId:number`**<br>contains the unique (and immutable) id assigned to this visual
* **`Peer:JQuery`**<br>contains the HTML element associated with this visual as a jQuery collection
* **`isAttached:boolean`**<br>is `true` if the HTML element for this visual is attached to the DOM - or `false` otherwise
* **`Id?:string`**<br>contains the HTML id set for the HTML element for this visual - or `undefined` if no id has been set
* **`Name?:WAT_Name`**<br>contains the WAT name of this visual - or `undefined` if no name has been set
* **`Label?:WAT_Label`**<br>contains the WAT label of this visual - or `undefined` if no label has been set
* **`Category:WAT_Category`**<br>contains the WAT category of this visual
* **`Master:WAT_Name`**<br>contains the (name of) the WAT master this visual is based on
* **`ErrorInfo_WAT_ErrorInfo`**<br>contains the error information record for this visual - or `undefined` if no such record exists
* **`Container?:WAT_Container`**<br>refers to the next outer visual containing this one - or is `undefined` if no such visual exists
* **`Layer?:WAT_Layer`**<br>refers to the WAT layer (i.e., card or overlay) equal to or containing this visual - or is `undefined` if no such layer exists
* **`Applet?:WAT_Applet`**<br>refers to the WAT applet equal to or containing this visual - or is `undefined` if no such applet exists
* **`mayBeDesigned:boolean`**<br>contains `true` if this visual may be altered by the WAT designer - or `false` otherwise
* **`mayBeDeleted:boolean`**<br>contains `true` if this visual may be removed from within the WAT designer - or `false` otherwise
* **`isVisible:boolean`**<br>contains `true` if this visual is principally visible - or `false` otherwise
* **`isShown:boolean`**<br>contains `true` if this visual is actually visible (i.e., the visual itself and all its containers are visible) - or `false` otherwise
* **`show ():void`**<br>sets this visual's visibility to `true`
* **`hide ():void`**<br>sets this visual's visibility to `false`
* **`isEnabled:boolean`**<br>contains `true` if this visual may react on mouse, touch and keyboard events - or `false` otherwise
* **`isDisabled:boolean`**<br>contains `true` if this visual must not react on mouse, touch and keyboard events - or `false` otherwise
* **`enable ():void`**<br>sets this visual's enabling to `true`
* **`disable ():void`**<br>sets this visual's enabling to `false`
* **`PropertySet:WAT_PropertySet`**<br>contains a set with the specifications of all properties defined for this visual's master
* **`PropertyMayBeDesigned (PropertyName:WAT_Identifier):boolean`**<br>returns `true` if the property called `PropertyName` exists in this visual's master and may be altered by the WAT designer
* **`State?:any`**<br>contains this visual's current custom state (which may be `undefined`)
* **`Value?:any`**<br>contains this visual's current value (which may be `undefined`)
* **`Script?:WAT_Text`**<br>contains this visual's own currently active script (which may be `undefined`)
* **`pendingScript?:WAT_Text`**<br>contains this visual's own currently configured pending script (which may be `undefined`)
* **`activatePendingScript ():void`**<br>activates this visual's own current pending script (if one exists)
* **`pendingScriptError:any`**<br>contains an error found in this visual's own pending script (if one was found)
* **`clearPendingScriptError ():void`**<br>clears this visual's `pendingScriptError`
* **`Classes:string`**<br>contains this visual's currently configured CSS classes
* **`TabIndex?:number`**<br>contains this visual's currently configured "tab index"
* **`PointerSensitivity:boolean`**<br>is `true` if this visual is currently sensitive for mouse or touch events - or `false` otherwise
* **`Overflows:WAT_Overflow[]`**<br>contains a list with this visual's currently configured horizontal and vertical overflow settings
* **`TextOverflow:WAT_TextOverflow`**<br>contains this visual's currently configured text overflow setting
* **`Opacity:number`**<br>contains this visual's currently configured opacity
* **`x:WAT_Location`**<br>contains this visual's current horizontal position within its container (measured in pixels)
* **`y:WAT_Location`**<br>contains this visual's current vertical position within its container (measured in pixels)
* **`Width:WAT_Dimension`**<br>contains this visual's current width (measured in pixels)
* **`Height:WAT_Dimension`**<br>contains this visual's current height (measured in pixels)
* **`Position:WAT_Position`**<br>contains this visual's current (horizontal and vertical) position within its container (measured in pixels)
* **`Size:WAT_Size`**<br>contains this visual's current size (i.e., width and height, measured in pixels)
* **`Geometry:WAT_Geometry`**<br>contains this visual's current "geometry" (given by its position and size, all measured in pixels)
* **`GeometryOnDisplay:WAT_Geometry`**<br>contains this visual's current "geometry" on the display (aka "viewport", given by its position and size on the display, all measured in pixels)
* **`horizontalAnchoring:WAT_horizontalAnchoring`**<br>contains this visual's current horizontal anchoring within its container
* **`verticalAnchoring:WAT_verticalAnchoring`**<br>contains this visual's current vertical anchoring within its container
* **`horizontalOffsets:WAT_horizontalOffsets`**<br>contains this visual's current horizontal offsets (depending on its horizontal anchorings, but all measured in pixels)
* **`verticalOffsets:WAT_verticalOffsets`**<br>contains this visual's current vertical offsets (depending on its vertical anchorings, but all measured in pixels)
* **`minWidth:WAT_Dimension`**<br>contains this visual's currently configured minimal width (or `0` if none is configured), measured in pixels
* **`minHeight:WAT_Dimension`**<br>contains this visual's currently configured minimal height (or `0` if none is configured), measured in pixels
* **`maxWidth:WAT_Dimension`**<br>contains this visual's currently configured maximal width (or `Infinity` if none is configured), measured in pixels
* **`maxHeight:WAT_Dimension`**<br>contains this visual's currently configured maximal height (or `Infinity` if none is configured), measured in pixels
* **`coversPointOnDisplay (xOnDisplay:WAT_Location, yOnDisplay:WAT_Location):boolean`**<br>returns `true` if this visual currently covers the given location on the display - or `false` if not
* **`FontFamily:WAT_Textline`**<br>contains this visual's currently configured CSS font-family
* **`FontSize:WAT_Dimension`**<br>contains this visual's currently configured CSS font-size (measured in pixels)
* **`FontWeight:WAT_FontWeight`**<br>contains this visual's currently configured CSS font-weight
* **`FontStyle:WAT_FontStyle`**<br>contains this visual's currently configured CSS font-style
* **`LineHeight:WAT_Dimension`**<br>contains this visual's currently configured CSS line-height (measured in pixels)
* **`TextDecoration:WAT_TextDecoration`**<br>contains this visual's currently configured CSS text decoration
* **`TextShadow:WAT_TextShadow`**<br>contains this visual's currently configured CSS text shadow
* **`TextAlignment:WAT_TextAlignment`**<br>contains this visual's currently configured text alignment
* **`ForegroundColor:WAT_Color`**<br>contains this visual's currently configured CSS foreground color
* **`Color:WAT_Color`**<br>is just a synonym for `ForegroundColor`
* **`BackgroundColor:WAT_Color`**<br>contains this visual's currently configured CSS background color
* **`BackgroundTexture:WAT_BackgroundTexture`**<br>contains this visual's currently configured CSS background texture
* **`BorderWidths:WAT_Dimension[]`**<br>contains a list with this visual's currently configured CSS border widths
* **`BorderColors:WAT_Color[]`**<br>contains a list with this visual's currently configured CSS border colors
* **`BorderStyles:WAT_BorderStyle[]`**<br>contains a list with this visual's currently configured CSS border styles
* **`BorderRadii:WAT_Dimension[]`**<br>contains a list with this visual's currently configured CSS border radii
* **`BoxShadow:WAT_BoxShadow`**<br>contains this visual's currently configured CSS box shadow
* **`Cursor:WAT_Cursor`**<br>contains this visual's currently configured standard CSS cursor
* **`customCursor?:WAT_customCursor`**<br>contains this visual's currently configured custom CSS cursor
* **`trigger (...ArgumentList:any):void`**<br>triggers a WAT event with the given parameters

### WAT_Applet ###

`class WAT_Applet extends WAT_Visual`<br>

"Applets" represent single WAT applications. A web page may contain multiple such applets, but they must not be nested.

In addition to the  properties and methods already mentioned for [WAT_Visual](#wat_visual), any `WAT_Applet` offers:

* **`globalVisual (globalName:WAT_Name):WAT_Visual`**<br>returns this applet's visual with the given `globalName` - or `undefined` if no such visual exists
* **`isBeingPreserved:boolean`**<br>contains `true` while this applet is being preserved - or `false` else
* **`isBeingRestored:boolean`**<br>contains `true` while this applet is being restored from its backup - or `false` else
* **`isBeingRemoved:boolean`**<br>contains `true` while this applet's backup is being removed - or `false` else
* **`CardList:WAT_Card[]`**<br>contains a list with this applet's cards in their current order
* **`CardLabelList:WAT_Label[]`**<br>contains a list with the labels of this applet's cards in their current order
* **`CardCount:number`**<br>contains the number of cards in this applet
* **`Card (CardOrNameOrIndex:WAT_Card|WAT_Name|number):WAT_Card|undefined`**<br>returns this applet's card with the given `CardOrNameOrIndex` - or `undefined` if no such cards exists
* **`CardAtIndex (Index:number):WAT_Card|undefined`**<br>returns this applet's card at the given `Index` - or `undefined` if no such cards exists
* **`CardNamed (Name:WAT_Name):WAT_Card|undefined`**<br>returns the first card in this applet with the given `Name` - or `undefined` if no such cards exists
* **`CardLabelled (Label:WAT_Label):WAT_Card|undefined`**<br>returns the first card in this applet with the given `Label` - or `undefined` if no such cards exists
* **`IndexOfCard (CardOrNameOrIndex:WAT_Card|WAT_Name|number):number`**<br>returns the index of this applet's card with the given `CardOrNameOrIndex` - or `undefined` if no such cards exists
* **`acceptsCardAt (CardOrNameOrIndex:WAT_Card|WAT_Name|number, InsertionPoint?:WAT_Card|WAT_Name|number):boolean`**<br>returns `true` if this applet allows the given `CardOrNameOrIndex` to be inserted at the given `InsertionPoint` - or `false` otherwise. If `InsertionPoint` is missing, it is assumed that the card should be appended 
* **`acceptsNewCardAt (Master:WAT_Name, InsertionPoint?:WAT_Card|WAT_Name|number):boolean`**<br>returns `true` if this applet allows a new card based on the given `Master` to be inserted at the given `InsertionPoint` - or `false` otherwise. If `InsertionPoint` is missing, it is assumed that the new card should be appended 
* **`newCardInsertedAt (Master:WAT_Name, InsertionPoint?:WAT_Card|WAT_Name|number):WAT_Card`**<br>creates a new card based on the given `Master` and inserts it at the given `InsertionPoint`. If `InsertionPoint` is missing, the new card is appended to the list of already existing cards
* **`DuplicateOfCard (CardOrNameOrIndex:WAT_Card|WAT_Name|number):WAT_Card`**<br>creates a duplicate of the given `CardOrNameOrIndex`and inserts it right after the original 
* **`CardDeserializedFrom (Serialization:string, InsertionPoint?:WAT_Card|WAT_Name|number):WAT_Card`**<br>creates a new card from the given `Serialization` and inserts it at the given `InsertionPoint`. If `InsertionPoint` is missing, the new card is appended to the list of already existing cards
* **`CardMayBeShiftedUp (CardOrNameOrIndex:WAT_Card|WAT_Name|number):boolean`**<br>returns `true` if the given `CardOrNameOrIndex` may be moved one position "up" (i.e. towards lower indices) in the list of cards of this applet - or `false` otherwise
* **`CardMayBeShiftedDown (CardOrNameOrIndex:WAT_Card|WAT_Name|number):boolean`**<br>returns `true` if the given `CardOrNameOrIndex` may be moved one position "down" (i.e. towards higher indices) in the list of cards of this applet - or `false` otherwise
* **`CardMayBeShiftedTo (CardOrNameOrIndex:WAT_Card|WAT_Name|number, InsertionPoint:WAT_Card|WAT_Name|number):boolean`**<br>returns `true` if the given `CardOrNameOrIndex` may be moved the position given by `InsertionPoint` in the list of cards of this applet - or `false` otherwise
* **`shiftCardUp (CardOrNameOrIndex:WAT_Card|WAT_Name|number):void`**<br>moves the given `CardOrNameOrIndex` one position "up" (i.e. towards lower indices) in the list of cards of this applet - provided that this is possible
* **`shiftCardDown (CardOrNameOrIndex:WAT_Card|WAT_Name|number):void`**<br>moves the given `CardOrNameOrIndex` one position "down" (i.e. towards higher indices) in the list of cards of this applet - provided that this is possible
* **`shiftCardTo (CardOrNameOrIndex:WAT_Card|WAT_Name|number, InsertionPoint:WAT_Card|WAT_Name|number):void`**<br>moves the given `CardOrNameOrIndex` to the position given by `InsertionPoint` in the list of cards of this applet - provided that this is possible
* **`removeCard (CardOrNameOrIndex:WAT_Card|WAT_Name|number):void`**<br>removes the given `CardOrNameOrIndex` - provided that this is possible
* **`shownCard:WAT_Card`**<br>
* **`shownCardIndex:number`**<br>
* **`CardIsShown (CardOrNameOrIndex:WAT_Card|WAT_Name|number):boolean`**<br>
* **`showCard (CardOrNameOrIndex:WAT_Card|WAT_Name|number):void`**<br>
* **`showFirstCard ():void`**<br>
* **`showPrevCard ():void`**<br>
* **`showPreviousCard ():void`**<br>
* **`showNextCard ():void`**<br>
* **`showLastCard ():void`**<br>
* **`OverlayList:WAT_Overlay[]`**<br>
* **`OverlayLabelList:WAT_Label[]`**<br>
* **`OverlayCount:number`**<br>
* **`Overlay (OverlayOrNameOrIndex:WAT_Overlay|WAT_Name|number):WAT_Overlay|undefined`**<br>
* **`OverlayAtIndex (Index:number):WAT_Overlay|undefined`**<br>
* **`OverlayNamed (Name:WAT_Name):WAT_Overlay|undefined`**<br>
* **`OverlayLabelled (Label:WAT_Label):WAT_Overlay|undefined`**<br>
* **`IndexOfOverlay (OverlayOrNameOrIndex:WAT_Overlay|WAT_Name|number):number`**<br>
* **`acceptsOverlayAt (OverlayOrNameOrIndex:WAT_Overlay|WAT_Name|number, InsertionPoint?:WAT_Overlay|WAT_Name|number):boolean`**<br>
* **`acceptsNewOverlayAt (Master:WAT_Name, InsertionPoint?:WAT_Overlay|WAT_Name|number):boolean`**<br>
* **`newOverlayInsertedAt (Master:WAT_Name, OverlayOrNameOrIndex?:WAT_Overlay|WAT_Name|number):WAT_Overlay`**<br>
* **`DuplicateOfOverlay (OverlayOrNameOrIndex:WAT_Overlay|WAT_Name|number):WAT_Overlay`**<br>
* **`OverlayDeserializedFrom (Serialization:string, OverlayOrNameOrIndex?:WAT_Overlay|WAT_Name|number):WAT_Overlay`**<br>
* **`OverlayMayBeShiftedUp (OverlayOrNameOrIndex:WAT_Overlay|WAT_Name|number):boolean`**<br>
* **`OverlayMayBeShiftedTo (OverlayOrNameOrIndex:WAT_Overlay|WAT_Name|number, InsertionPoint:WAT_Overlay|WAT_Name|number):boolean`**<br>
* **`shiftOverlayUp (OverlayOrNameOrIndex:WAT_Overlay|WAT_Name|number):void`**<br>
* **`shiftOverlayDown (OverlayOrNameOrIndex:WAT_Overlay|WAT_Name|number):void`**<br>
* **`shiftOverlayTo (OverlayOrNameOrIndex:WAT_Overlay|WAT_Name|number, InsertionPoint:WAT_Overlay|WAT_Name|number):void`**<br>
* **`removeOverlay (OverlayOrNameOrIndex:WAT_Overlay|WAT_Name|number):void`**<br>
* **`frontmostOverlayOfClass (ClassName:WAT_Name):WAT_Overlay | undefined`**<br>
* **`bringOverlayToFrontOfClass (OverlayOrNameOrIndex:WAT_Overlay|WAT_Name|number, ClassName:WAT_Name):void`**<br>

### WAT_Container ###

`abstract class WAT_Container extends WAT_Visual`<br>

"Containers" are visuals which may contain inner "components". Cards, overlays and compounds are containers.

In addition to the properties and methods already mentioned for [WAT_Visual](#wat_visual), any `WAT_Container` offers:

* **`ComponentList:WAT_Component[]`**<br>
* **`ComponentLabelList:WAT_Label[]`**<br>
* **`ComponentCount:number`**<br>
* **`Component (ComponentOrNameOrIndex:WAT_Component|WAT_Name|number):WAT_Component|undefined`**<br>
* **`ComponentAtIndex (Index:number):WAT_Component|undefined`**<br>
* **`ComponentNamed (Name:WAT_Name):WAT_Component|undefined`**<br>
* **`ComponentLabelled (Label:WAT_Label):WAT_Component|undefined`**<br>
* **`IndexOfComponent (ComponentOrNameOrIndex:WAT_Component|WAT_Name|number):number`**<br>
* **`acceptsComponentAt (ComponentOrNameOrIndex:WAT_Component|WAT_Name|number, InsertionPoint?:WAT_Component|WAT_Name|number):boolean`**<br>
* **`acceptsNewComponentAt (Master:WAT_Name, InsertionPoint?:WAT_Component|WAT_Name|number):boolean`**<br>
* **`newComponentInsertedAt (Master:WAT_Name, ComponentOrNameOrIndex?:WAT_Component|WAT_Name|number):WAT_Component`**<br>
* **`DuplicateOfComponent (ComponentOrNameOrIndex:WAT_Component|WAT_Name|number):WAT_Component`**<br>
* **`ComponentDeserializedFrom (Serialization:string, ComponentOrNameOrIndex?:WAT_Component|WAT_Name|number):WAT_Component`**<br>
* **`ComponentMayBeShiftedUp (ComponentOrNameOrIndex:WAT_Component|WAT_Name|number):boolean`**<br>
* **`ComponentMayBeShiftedTo (ComponentOrNameOrIndex:WAT_Component|WAT_Name|number, InsertionPoint:WAT_Component|WAT_Name|number):boolean`**<br>
* **`shiftComponentUp (ComponentOrNameOrIndex:WAT_Component|WAT_Name|number):void`**<br>
* **`shiftComponentDown (ComponentOrNameOrIndex:WAT_Component|WAT_Name|number):void`**<br>
* **`shiftComponentTo (ComponentOrNameOrIndex:WAT_Component|WAT_Name|number, InsertionPoint:WAT_Component|WAT_Name|number):void`**<br>
* **`removeComponent (ComponentOrNameOrIndex:WAT_Component|WAT_Name|number):void`**<br>

### WAT_Layer ###

`abstract class WAT_Layer extends WAT_Container`<br>

"Layers" are the direct descendants of an applet. Cards and overlays are layers. `WAT_Layer` is basically a "marker interface" and does not provide any own properties or methods.

### WAT_Card ###

`class WAT_Card extends WAT_Layer`<br>

"Cards" are direct descendants of an applet, covering its whole visible area. Applets must contain one card, at least, but usally they contain multiple of them. Only one card may be visible at any time.

In addition to the properties and methods already mentioned for [WAT_Visual](#wat_visual), [WAT_Container](#wat_container) and [WAT_Layer](#wat_layer), any `WAT_Card` offers:

* **`mayBeDisplaced:boolean`**<br>
* **`mayBeDeformed:boolean`**<br>
* **`Index:number`**<br>
* **`mayBeShiftedUp:boolean`**<br>
* **`mayBeShiftedDown:boolean`**<br>
* **`mayBeShiftedTo:boolean`**<br>
* **`shiftUp ():void`**<br>
* **`shiftDown ():void`**<br>
* **`shiftTo (InsertionPoint:WAT_Card|WAT_Name|number):void`**<br>
* **`mayBeRemoved:boolean`**<br>
* **`remove ():void`**<br>

### WAT_Overlay ###

`class WAT_Overlay extends WAT_Layer`<br>

"Overlays" are direct descendants of an applet. In contrast to a "card", an overlay may have an arbitrary size and position and multiple overlays may be visible simultaneously. Overlays are commonly used to implement dialogs, palettes, toasts, menues and similar

In addition to the properties and methods already mentioned for [WAT_Visual](#wat_visual), [WAT_Container](#wat_container) and [WAT_Layer](#wat_layer), any `WAT_Overlay` offers:

* **`mayBeDisplaced:boolean`**<br>
* **`mayBeDeformed:boolean`**<br>
* **`Index:number`**<br>
* **`mayBeShiftedUp:boolean`**<br>
* **`mayBeShiftedDown:boolean`**<br>
* **`mayBeShiftedTo:boolean`**<br>
* **`shiftUp ():void`**<br>
* **`shiftDown ():void`**<br>
* **`shiftTo (InsertionPoint:WAT_Overlay|WAT_Name|number):void`**<br>
* **`mayBeRemoved:boolean`**<br>
* **`remove ():void`**<br>
* **`showAround (x:number,y:number, Constraint:'withinApplet'|'withinViewport' = 'withinViewport'):void`**<br>
* **`isFrontmostOfClass (ClassName:WAT_Name):boolean`**<br>
* **`bringToFrontOfClass (ClassName:WAT_Name):void`**<br>

### WAT_Component ###

`interface WAT_Component`<br>

"Components" are the building blocks of cards and overlays. They often represent a single user interface element and may contain other components themselves.

Any `WAT_Component` offers the following properties and methods:

* **`Index:number`**<br>
* **`mayBeDisplaced:boolean`**<br>
* **`mayBeDeformed:boolean`**<br>
* **`Index:number`**<br>
* **`mayBeShiftedUp:boolean`**<br>
* **`mayBeShiftedDown:boolean`**<br>
* **`mayBeShiftedTo:boolean`**<br>
* **`shiftUp ():void`**<br>
* **`shiftDown ():void`**<br>
* **`shiftTo (InsertionPoint:WAT_Control|WAT_Compound|WAT_Name|number):void`**<br>
* **`mayBeRemoved:boolean`**<br>
* **`remove ():void`**<br>

### WAT_Compound ###

`class WAT_Compound extends WAT_Container implements WAT_Component`<br>

"Compounds" are nested controls, i.e. controls which contain inner controls.

Apart from those already mentioned for [WAT_Visual](#wat_visual), [WAT_Container](#wat_container) and [WAT_Component](#wat_component),  `WAT_Compound`s do not offer any additional properties and methods.

### WAT_Control ###

`class WAT_Control extends WAT_Visual implements WAT_Component`<br>

A "control" represents a single (perhaps nested) HTML element. Many controls are HTML `input` elements, but `div`s and `span`s are possible as well.

Apart from those already mentioned for [WAT_Visual](#wat_visual) and [WAT_Component](#wat_component), `WAT_Control`s do not offer any additional properties and methods.

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
* `WAT_Designer` - users may provide their own custom "Designer", this is the interface any Designer must adhere to

### intrinsic Events ###

Out-of-the-box, the `webapp-tinkerer-runtime` emits the following events

* **`applet-started`**<br>
* **`before-serialization`**<br>
* **`after-serialization`**<br>
* **`prepare-refresh`**<br>
* **`value-changed`**<br>

### reserved "data" Attributes ###

The `webapp-tinkerer-runtime` reserves all data attributes starting with `wat-` for its own internal use. Currently, the following attributes are used:

* **`wat-master`** - contains the name of a WAT visual's configured `Master`
* **`wat-master-version`** - contains the current version of a WAT visual's configured `Master`
* **`wat-name`** - contains the configured `Name` of a WAT visual
* **`wat-label`** - contains the configured `Label` of a WAT visual
* **`wat-script`** - contains the active script of a WAT visual
* **`wat-pending-script`** - contains the pending script of a WAT visual
* **`wat-state`** - contains the serialized `State` of a WAT visual
* **`wat-designability`** - if set to `false` the WAT visual must not be altered by the WAT Designer
* **`wat-deletability`** - if set to `false` the WAT visual must not be deleted by the WAT Designer

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
