/*******************************************************************************
*                                                                              *
*                        WebApp Tinkerer (WAT) Runtime                         *
*                                                                              *
*******************************************************************************/
export declare const Version = "0.1.0";
export declare const WAT_Categories: string[];
export declare type WAT_Category = typeof WAT_Categories[number];
export declare type WAT_SemVer = string;
declare type WAT_normalizedVersion = {
    major: number;
    minor: number;
    Patch: number;
    Build: number;
};
export declare type WAT_Id = string;
export declare type WAT_Name = string;
export declare type WAT_Label = string;
export declare type WAT_Identifier = string;
/**** layout setting types ****/
export declare type WAT_Location = number;
export declare type WAT_Dimension = number;
export declare type WAT_Position = {
    x: WAT_Location;
    y: WAT_Location;
};
export declare type WAT_Size = {
    Width: WAT_Dimension;
    Height: WAT_Dimension;
};
export declare type WAT_Geometry = {
    x: WAT_Location;
    y: WAT_Location;
    Width: WAT_Dimension;
    Height: WAT_Dimension;
};
export declare const WAT_horizontalAnchorings: string[];
export declare type WAT_horizontalAnchoring = typeof WAT_horizontalAnchorings[number];
export declare const WAT_verticalAnchorings: string[];
export declare type WAT_verticalAnchoring = typeof WAT_verticalAnchorings[number];
export declare type WAT_horizontalOffsets = [WAT_Location | WAT_Dimension, WAT_Location | WAT_Dimension];
export declare type WAT_verticalOffsets = [WAT_Location | WAT_Dimension, WAT_Location | WAT_Dimension];
/**** visual setting types ****/
export declare const WAT_FontWeights: string[];
export declare type WAT_FontWeight = typeof WAT_FontWeights[number];
export declare const WAT_FontWeightValues: any;
export declare const WAT_FontStyles: string[];
export declare type WAT_FontStyle = typeof WAT_FontStyles[number];
export declare const WAT_TextDecorationLines: string[];
export declare type WAT_TextDecorationLine = typeof WAT_TextDecorationLines[number];
export declare const WAT_TextDecorationStyles: string[];
export declare type WAT_TextDecorationStyle = typeof WAT_TextDecorationStyles[number];
export declare type WAT_TextDecoration = {
    Line: WAT_TextDecorationLine;
    Color?: WAT_Color;
    Style?: WAT_TextDecorationStyle;
    Thickness?: WAT_Dimension;
};
export declare type WAT_TextShadow = {
    xOffset: WAT_Location;
    yOffset: WAT_Location;
    BlurRadius: WAT_Dimension;
    Color: WAT_Color;
};
export declare const WAT_TextAlignments: string[];
export declare type WAT_TextAlignment = typeof WAT_TextAlignments[number];
export declare const WAT_BackgroundModes: string[];
export declare type WAT_BackgroundMode = typeof WAT_BackgroundModes[number];
export declare type WAT_BackgroundTexture = {
    ImageURL: WAT_URL;
    Mode: WAT_BackgroundMode;
    xOffset: WAT_Location;
    yOffset: WAT_Location;
};
export declare const WAT_BorderStyles: string[];
export declare type WAT_BorderStyle = typeof WAT_BorderStyles[number];
export declare type WAT_BoxShadow = {
    isInset: boolean;
    xOffset: WAT_Location;
    yOffset: WAT_Location;
    BlurRadius: WAT_Dimension;
    SpreadRadius: WAT_Dimension;
    Color: WAT_Color;
};
export declare const WAT_Cursors: string[];
export declare type WAT_Cursor = typeof WAT_Cursors[number];
export declare type WAT_customCursor = {
    ImageURL: WAT_URL;
    xOffset: WAT_Location;
    yOffset: WAT_Location;
};
export declare const WAT_Overflows: string[];
export declare type WAT_Overflow = typeof WAT_Overflows[number];
export declare const WAT_TextOverflows: string[];
export declare type WAT_TextOverflow = typeof WAT_TextOverflows[number];
/**** additional data types ****/
export declare type WAT_Text = string;
export declare type WAT_Textline = string;
export declare type WAT_Color = string;
export declare type WAT_URL = string;
/**** ValueIsElement ****/
export declare function ValueIsElement(Value: any): boolean;
/**** allow/expect[ed]Element ****/
export declare const allowElement: Function, allowedElement: Function;
export declare const expectElement: Function, expectedElement: Function;
/**** ValueIsVisual ****/
export declare function ValueIsVisual(Value: any): boolean;
/**** allow/expect[ed]Visual ****/
export declare const allowVisual: Function, allowedVisual: Function;
export declare const expectVisual: Function, expectedVisual: Function;
/**** ValueIsApplet ****/
export declare function ValueIsApplet(Value: any): boolean;
/**** allow/expect[ed]Applet ****/
export declare const allowApplet: Function, allowedApplet: Function;
export declare const expectApplet: Function, expectedApplet: Function;
/**** ValueIsCard ****/
export declare function ValueIsCard(Value: any): boolean;
/**** allow/expect[ed]Card ****/
export declare const allowCard: Function, allowedCard: Function;
export declare const expectCard: Function, expectedCard: Function;
/**** ValueIsOverlay ****/
export declare function ValueIsOverlay(Value: any): boolean;
/**** allow/expect[ed]Overlay ****/
export declare const allowOverlay: Function, allowedOverlay: Function;
export declare const expectOverlay: Function, expectedOverlay: Function;
/**** ValueIsControl ****/
export declare function ValueIsControl(Value: any): boolean;
/**** allow/expect[ed]Control ****/
export declare const allowControl: Function, allowedControl: Function;
export declare const expectControl: Function, expectedControl: Function;
/**** ValueIsCompound ****/
export declare function ValueIsCompound(Value: any): boolean;
/**** allow/expect[ed]Compound ****/
export declare const allowCompound: Function, allowedCompound: Function;
export declare const expectCompound: Function, expectedCompound: Function;
/**** ValueIsComponent ****/
export declare function ValueIsComponent(Value: any): boolean;
/**** allow/expect[ed]Component ****/
export declare const allowComponent: Function, allowedComponent: Function;
export declare const expectComponent: Function, expectedComponent: Function;
/**** ValueIsContainer ****/
export declare function ValueIsContainer(Value: any): boolean;
/**** allow/expect[ed]Container ****/
export declare const allowContainer: Function, allowedContainer: Function;
export declare const expectContainer: Function, expectedContainer: Function;
export declare function ValueIsUniqueId(Value: any): boolean;
/**** allow/expect[ed]UniqueId ****/
export declare const allowUniqueId: Function, allowedUniqueId: Function;
export declare const expectUniqueId: Function, expectedUniqueId: Function;
export declare function ValueIsId(Value: any): boolean;
/**** allow/expect[ed]Id ****/
export declare const allowId: Function, allowedId: Function;
export declare const expectId: Function, expectedId: Function;
export declare function ValueIsName(Value: any): boolean;
/**** allow/expect[ed]Name ****/
export declare const allowName: Function, allowedName: Function;
export declare const expectName: Function, expectedName: Function;
export declare function ValueIsUniversalName(Value: any): boolean;
/**** allow/expect[ed]UniversalName ****/
export declare const allowUniversalName: Function, allowedUniversalName: Function;
export declare const expectUniversalName: Function, expectedUniversalName: Function;
/**** ValueIsLabel ****/
export declare function ValueIsLabel(Value: any): boolean;
/**** allow/expect[ed]Label ****/
export declare const allowLabel: Function, allowedLabel: Function;
export declare const expectLabel: Function, expectedLabel: Function;
export declare function ValueIsIdentifier(Value: any): boolean;
/**** allow/expect[ed]Identifier ****/
export declare const allowIdentifier: Function, allowedIdentifier: Function;
export declare const expectIdentifier: Function, expectedIdentifier: Function;
/**** ValueIsLocation ****/
export declare function ValueIsLocation(Value: any): boolean;
/**** allow/expect[ed]Location ****/
export declare const allowLocation: Function, allowedLocation: Function;
export declare const expectLocation: Function, expectedLocation: Function;
/**** ValueIsDimension ****/
export declare function ValueIsDimension(Value: any): boolean;
/**** allow/expect[ed]Dimension ****/
export declare const allowDimension: Function, allowedDimension: Function;
export declare const expectDimension: Function, expectedDimension: Function;
export declare function ValueIsSemVer(Value: any): boolean;
/**** allow/expect[ed]SemVer ****/
export declare const allowSemVer: Function, allowedSemVer: Function;
export declare const expectSemVer: Function, expectedSemVer: Function;
/**** throwReadOnlyError ****/
export declare function throwReadOnlyError(Name: WAT_Name): never;
/**** throwWriteOnlyError ****/
export declare function throwWriteOnlyError(Name: WAT_Name): never;
/**** PropertyDescriptorFor ****/
export declare function PropertyDescriptorFor(Target: any, Property: any): any;
/**** registerResources ****/
export declare function registerResources(Resources: string): void;
/**** unregisterResources ****/
export declare function unregisterResources(Resources: string | undefined): void;
/**** AppletsMayBePreserved ****/
export declare function AppletsMayBePreserved(): boolean;
/**** AppletMayBePreserved ****/
export declare function AppletMayBePreserved(Applet: WAT_Applet): boolean;
/**** AppletHasBackup ****/
export declare function AppletHasBackup(AppletOrPeer: WAT_Applet | HTMLElement): Promise<boolean>;
/**** preserveApplet ****/
export declare function preserveApplet(Applet: WAT_Applet): Promise<void>;
/**** restoreApplet (while applet is running) ****/
export declare function restoreApplet(Applet: WAT_Applet, CollisionHandling: WAT_CollisionHandling): Promise<void>;
/**** removeBackupOfApplet ****/
export declare function removeBackupOfApplet(Applet: WAT_Applet): Promise<void>;
/**** serializedMaster ****/
export declare function serializedMaster(Master: WAT_Name, withPendingSettings?: 'withPendingSettings'): string;
/**** parsedSerialization ****/
declare type WAT_parsedSerialization = {
    serializedResources: string[];
    serializedMasters: string[];
    serializedApplets: string[];
    serializedCards: string[];
    serializedOverlays: string[];
    serializedComponents: string[];
};
export declare function parsedSerialization(Serialization: string): WAT_parsedSerialization;
/**** deserializedMaster ****/
export declare function deserializedMaster(Serialization: string): WAT_MasterInfo;
/**** AppletDeserializedFrom ****/
export declare function AppletDeserializedFrom(oldApplet: WAT_Applet, Serialization: string): WAT_Applet;
declare type WAT_StyleSet = {
    [Key: string]: (string | undefined);
};
declare type WAT_PropertySet = {
    [Key: string]: string;
};
declare type WAT_MasterInfo = {
    Name: WAT_Name;
    Version?: WAT_normalizedVersion;
    Category: WAT_Category;
    Resources?: WAT_Text;
    pendingResources?: WAT_Text;
    Template: WAT_Text;
    pendingTemplate?: WAT_Text;
    Classes?: WAT_Name[];
    pendingClasses?: WAT_Name[];
    Styles?: WAT_StyleSet;
    pendingStyles?: WAT_StyleSet;
    Script?: WAT_Text;
    pendingScript?: WAT_Text;
    Properties?: WAT_Property[];
    undesignablePropertySet?: WAT_PropertySet;
    ErrorInfo?: WAT_ErrorInfo;
    compiledScript?: Function;
    UsageCount: number;
};
declare const WAT_VersionHandlings: string[];
declare type WAT_VersionHandling = typeof WAT_VersionHandlings[number];
declare type WAT_CollisionHandling = {
    compatibleDowngrade: WAT_VersionHandling;
    incompatibleDowngrade: WAT_VersionHandling;
    sameVersion: WAT_VersionHandling;
    compatibleUpgrade: WAT_VersionHandling;
    incompatibleUpgrade: WAT_VersionHandling;
};
export declare const WAT_PropertyEditorTypes: string[];
export declare type WAT_PropertyEditorType = typeof WAT_PropertyEditorTypes[number];
export declare type WAT_Property = {
    Identifier: WAT_Identifier;
    Label: WAT_Textline;
    EditorType: WAT_PropertyEditorType;
} & {
    FalseValue?: string;
    TrueValue?: string;
    minLength?: number;
    maxLength?: number;
    multiple?: boolean;
    Pattern?: string;
    minValue?: any;
    maxValue?: any;
    StepValue?: 'any' | number;
    ValueList?: any[];
};
/**** registerMasterFromSerialization ****/
export declare function registerMasterFromSerialization(Serialization: string): void;
/**** unregisterMaster ****/
export declare function unregisterMaster(Name: WAT_Name): void;
/**** hasMaster ****/
export declare function hasMaster(Name: WAT_Name): boolean;
/**** lacksMaster ****/
export declare function lacksMaster(Name: WAT_Name): boolean;
/**** createMaster ****/
export declare function createMaster(Name: WAT_Name, Category: WAT_Category, Version?: WAT_SemVer, Template?: WAT_Text): void;
/**** DuplicateOfMaster ****/
export declare function DuplicateOfMaster(oldName: WAT_Name, newName: WAT_Name, newVersion?: WAT_normalizedVersion): WAT_MasterInfo;
/**** renameMaster ****/
export declare function renameMaster(oldName: WAT_Name, newName: WAT_Name, updateInstances?: boolean): void;
/**** [set]NameOfMaster ****/
export declare function NameOfMaster(Name: WAT_Name): WAT_Name;
export declare function setNameOfMaster(oldName: WAT_Name, newName: WAT_Name): void;
/**** CategoryOfMaster ****/
export declare function CategoryOfMaster(Name: WAT_Name): WAT_Category;
/**** [set]VersionOfMaster ****/
export declare function VersionOfMaster(Name: WAT_Name): WAT_SemVer;
export declare function setVersionOfMaster(Name: WAT_Name, newSemVer: WAT_SemVer): void;
/**** ResourcesOfMaster ****/
export declare function ResourcesOfMaster(Name: WAT_Name): WAT_Text | undefined;
/**** [set]PendingResourcesOfMaster ****/
export declare function pendingResourcesOfMaster(Name: WAT_Name): WAT_Text | undefined;
export declare function setPendingResourcesOfMaster(Name: WAT_Name, newResources?: WAT_Text): void;
/**** activatePendingResourcesOfMaster ****/
export declare function activatePendingResourcesOfMaster(Name: WAT_Name): void;
/**** TemplateOfMaster ****/
export declare function TemplateOfMaster(Name: WAT_Name): WAT_Text | undefined;
/**** [set]PendingTemplateOfMaster ****/
export declare function pendingTemplateOfMaster(Name: WAT_Name): WAT_Text | undefined;
export declare function setPendingTemplateOfMaster(Name: WAT_Name, newTemplate?: WAT_Text): void;
/**** activatePendingTemplateOfMaster ****/
export declare function activatePendingTemplateOfMaster(Name: WAT_Name): void;
/**** ClassesOfMaster ****/
export declare function ClassesOfMaster(Name: WAT_Name): WAT_Text;
/**** [set]PendingClassesOfMaster ****/
export declare function pendingClassesOfMaster(Name: WAT_Name): WAT_Text;
export declare function setPendingClassesOfMaster(Name: WAT_Name, newClasses?: WAT_Text): void;
/**** activatePendingClassesOfMaster ****/
export declare function activatePendingClassesOfMaster(Name: WAT_Name): void;
/**** StylesOfMaster ****/
export declare function StylesOfMaster(Name: WAT_Name): WAT_Text;
/**** [set]PendingStylesOfMaster ****/
export declare function pendingStylesOfMaster(Name: WAT_Name): WAT_Text;
export declare function setPendingStylesOfMaster(Name: WAT_Name, newStyles?: WAT_Text): void;
/**** activatePendingStylesOfMaster ****/
export declare function activatePendingStylesOfMaster(Name: WAT_Name): void;
/**** ScriptOfMaster ****/
export declare function ScriptOfMaster(Name: WAT_Name): WAT_Text | undefined;
/**** [set]PendingScriptOfMaster ****/
export declare function pendingScriptOfMaster(Name: WAT_Name): WAT_Text | undefined;
export declare function setPendingScriptOfMaster(Name: WAT_Name, newScript?: WAT_Text): void;
/**** activatePendingScriptOfMaster ****/
export declare function activatePendingScriptOfMaster(Name: WAT_Name): void;
/**** PropertiesOfMaster ****/
export declare function PropertiesOfMaster(Name: WAT_Name): WAT_Property[];
/**** PropertyNamesOfMaster ****/
export declare function PropertyNamesOfMaster(Name: WAT_Name): WAT_Identifier[];
/**** PropertyOfMaster ****/
export declare function PropertyOfMaster(Name: WAT_Name, Identifier: WAT_Identifier): WAT_Property | undefined;
/**** MasterHasProperty ****/
export declare function MasterHasProperty(Name: WAT_Name, Identifier: WAT_Identifier): boolean;
/**** MasterLacksProperty ****/
export declare function MasterLacksProperty(Name: WAT_Name, Identifier: WAT_Identifier): boolean;
/**** insertPropertyOfMasterAt ****/
export declare function insertPropertyOfMasterAt(Name: WAT_Name, Specification: WAT_Property, Index?: number): void;
/**** renamePropertyOfMaster ****/
export declare function renamePropertyOfMaster(Name: WAT_Name, oldIdentifier: WAT_Identifier, newIdentifier: WAT_Identifier): void;
/**** changePropertyOfMaster ****/
export declare function changePropertyOfMaster(Name: WAT_Name, Identifier: WAT_Identifier, Specification: WAT_Property): void;
/**** IndexOfPropertyOfMaster ****/
export declare function IndexOfPropertyOfMaster(Name: WAT_Name, Identifier: WAT_Identifier): number;
/**** PropertyCountOfMaster ****/
export declare function PropertyCountOfMaster(Name: WAT_Name): number;
/**** PropertyOfMasterMayBeMovedUp ****/
export declare function PropertyOfMasterMayBeMovedUp(Name: WAT_Name, Identifier: WAT_Identifier): boolean;
/**** PropertyOfMasterMayBeMovedDown ****/
export declare function PropertyOfMasterMayBeMovedDown(Name: WAT_Name, Identifier: WAT_Identifier): boolean;
/**** movePropertyOfMasterToTop ****/
export declare function movePropertyOfMasterToTop(Name: WAT_Name, Identifier: WAT_Identifier): void;
/**** movePropertyOfMasterUp ****/
export declare function movePropertyOfMasterUp(Name: WAT_Name, Identifier: WAT_Identifier): void;
/**** movePropertyOfMasterDown ****/
export declare function movePropertyOfMasterDown(Name: WAT_Name, Identifier: WAT_Identifier): void;
/**** movePropertyOfMasterToBottom ****/
export declare function movePropertyOfMasterToBottom(Name: WAT_Name, Identifier: WAT_Identifier): void;
/**** movePropertyOfMasterTo ****/
export declare function movePropertyOfMasterTo(Name: WAT_Name, Identifier: WAT_Identifier, newIndex: number): void;
/**** removePropertyOfMaster ****/
export declare function removePropertyOfMaster(Name: WAT_Name, Identifier: WAT_Identifier): void;
/**** ErrorInfoOfMaster ****/
export declare function ErrorInfoOfMaster(Name: WAT_Name): WAT_ErrorInfo | undefined;
/**** UsageCountOfMaster ****/
export declare function UsageCountOfMaster(Name: WAT_Name): number;
/**** Masters ****/
export declare function Masters(): WAT_Name[];
/**** instantiableMasters - i.e., all without Applet masters ****/
export declare function instantiableMasters(): WAT_Name[];
/**** instantiableLayerMasters ****/
export declare function instantiableLayerMasters(): WAT_Name[];
/**** instantiableComponentMasters ****/
export declare function instantiableComponentMasters(): WAT_Name[];
/**** missingMasters ****/
export declare function missingMasters(): WAT_Name[];
/**** unusedMasters ****/
export declare function unusedMasters(): WAT_Name[];
/**** MastersUsedByVisuals ****/
export declare function MastersUsedByVisuals(VisualList: WAT_Visual[], withoutIntrinsics?: 'withoutIntrinsics'): WAT_Name[];
export declare type WAT_ErrorInfo = {
    Title: string;
    longMessage: string;
    shortMessage: string;
    Reason?: string;
    Applet: WAT_Applet;
    Sufferer: WAT_Name | WAT_Visual;
    Property?: WAT_Identifier;
};
/**** VisualForElement (public version w/ validation) ****/
export declare function VisualForElement(Element: HTMLElement): WAT_Visual;
/**** newUniqueId ****/
export declare function newUniqueId(): number;
export declare abstract class WAT_Visual {
    /**** uniqueId ****/
    get uniqueId(): number;
    set uniqueId(newId: number);
    /**** Peer ****/
    get Peer(): any;
    set Peer(newPeer: any);
    /**** isAttached ****/
    get isAttached(): any;
    set isAttached(newAttachment: any);
    /**** Id ****/
    get Id(): string | undefined;
    set Id(newId: string | undefined);
    /**** Name ****/
    get Name(): string;
    set Name(newName: string);
    /**** Label ****/
    get Label(): WAT_Label;
    set Label(newLabel: WAT_Label);
    /**** Category ****/
    get Category(): any;
    set Category(newCategory: any);
    /**** Master ****/
    get Master(): any;
    set Master(newMaster: any);
    /**** ErrorInfo ****/
    get ErrorInfo(): any;
    set ErrorInfo(newErrorInfo: any);
    /**** Container ****/
    get Container(): any;
    set Container(newContainer: any);
    /**** Layer ****/
    get Layer(): any;
    set Layer(newLayer: any);
    /**** Applet ****/
    get Applet(): any;
    set Applet(newApplet: any);
    /**** mayBeDesigned ****/
    get mayBeDesigned(): boolean;
    set mayBeDesigned(newDesignability: boolean);
    /**** mayBeDeleted ****/
    get mayBeDeleted(): boolean;
    set mayBeDeleted(newDeletability: boolean);
    /**** isVisible ****/
    get isVisible(): boolean;
    set isVisible(newVisibility: boolean);
    /**** isShown ****/
    get isShown(): any;
    set isShown(newEmergence: any);
    /**** show/hide ****/
    show(): void;
    hide(): void;
    /**** isEnabled ****/
    get isEnabled(): boolean;
    set isEnabled(newEnabling: boolean);
    /**** isDisabled ****/
    get isDisabled(): boolean;
    set isDisabled(newDisabling: boolean);
    /**** enable/disable ****/
    enable(): void;
    disable(): void;
    /**** PropertySet ****/
    get PropertySet(): any;
    set PropertySet(newPropertySet: any);
    /**** PropertyMayBeDesigned - a method especially for the Designer ****/
    PropertyMayBeDesigned(PropertyName: WAT_Identifier): boolean;
    /**** State ****/
    get State(): any;
    set State(newState: any);
    /**** Value (default implementation, may be overwritten) ****/
    get Value(): any;
    set Value(newValue: any);
    /**** Script ****/
    get Script(): any;
    set Script(newScript: any);
    /**** pendingScript ****/
    get pendingScript(): WAT_Text;
    set pendingScript(newPendingScript: WAT_Text);
    /**** activatePendingScript ****/
    activatePendingScript(): void;
    /**** activeScript ****/
    get pendingScriptError(): any;
    set pendingScriptError(newError: any);
    /**** clearPendingScriptError ****/
    clearPendingScriptError(): void;
    /**** Classes ****/
    get Classes(): string;
    set Classes(newClasses: string);
    /**** TabIndex ****/
    get TabIndex(): number | undefined;
    set TabIndex(newTabIndex: number | undefined);
    /**** PointerSensitivity ****/
    get PointerSensitivity(): boolean;
    set PointerSensitivity(newPointerSensitivity: boolean);
    /**** Overflows ****/
    get Overflows(): WAT_Overflow[];
    set Overflows(newOverflows: WAT_Overflow[]);
    /**** TextOverflow ****/
    get TextOverflow(): WAT_TextOverflow;
    set TextOverflow(newTextOverflow: WAT_TextOverflow);
    /**** Opacity ****/
    get Opacity(): number;
    set Opacity(newOpacity: number);
    /**** x ****/
    get x(): WAT_Location;
    set x(newX: WAT_Location);
    /**** y ****/
    get y(): WAT_Location;
    set y(newY: WAT_Location);
    /**** Width ****/
    get Width(): WAT_Dimension;
    set Width(newWidth: WAT_Dimension);
    /**** Height ****/
    get Height(): WAT_Dimension;
    set Height(newHeight: WAT_Dimension);
    /**** Position ****/
    get Position(): WAT_Position;
    set Position(newPosition: WAT_Position);
    /**** Size ****/
    get Size(): WAT_Size;
    set Size(newSize: WAT_Size);
    /**** Geometry ****/
    get Geometry(): WAT_Geometry;
    set Geometry(newGeometry: WAT_Geometry);
    /**** GeometryOnDisplay ****/
    get GeometryOnDisplay(): any;
    set GeometryOnDisplay(newGeometry: any);
    /**** horizontalAnchoring ****/
    get horizontalAnchoring(): WAT_horizontalAnchoring;
    set horizontalAnchoring(newAnchoring: WAT_horizontalAnchoring);
    /**** verticalAnchoring ****/
    get verticalAnchoring(): WAT_verticalAnchoring;
    set verticalAnchoring(newAnchoring: WAT_verticalAnchoring);
    /**** horizontalOffsets ****/
    get horizontalOffsets(): WAT_horizontalOffsets;
    set horizontalOffsets(newOffsets: WAT_horizontalOffsets);
    /**** verticalOffsets ****/
    get verticalOffsets(): WAT_verticalOffsets;
    set verticalOffsets(newOffsets: WAT_verticalOffsets);
    /**** min/maxWidth ****/
    get minWidth(): WAT_Dimension;
    set minWidth(newMinimum: WAT_Dimension);
    get maxWidth(): WAT_Dimension;
    set maxWidth(newMaximum: WAT_Dimension);
    /**** min/maxHeight ****/
    get minHeight(): WAT_Dimension;
    set minHeight(newMinimum: WAT_Dimension);
    get maxHeight(): WAT_Dimension;
    set maxHeight(newMaximum: WAT_Dimension);
    /**** coversPointOnDisplay ****/
    coversPointOnDisplay(xOnDisplay: WAT_Location, yOnDisplay: WAT_Location): boolean;
    /**** FontFamily ****/
    get FontFamily(): WAT_Textline;
    set FontFamily(newFontFamily: WAT_Textline);
    /**** FontSize ****/
    get FontSize(): WAT_Dimension;
    set FontSize(newFontSize: WAT_Dimension);
    /**** FontWeight ****/
    get FontWeight(): WAT_FontWeight;
    set FontWeight(newFontWeight: WAT_FontWeight);
    /**** FontStyle ****/
    get FontStyle(): WAT_FontStyle;
    set FontStyle(newFontStyle: WAT_FontStyle);
    /**** LineHeight ****/
    get LineHeight(): WAT_Dimension;
    set LineHeight(newLineHeight: WAT_Dimension);
    /**** TextDecoration ****/
    get TextDecoration(): WAT_TextDecoration;
    set TextDecoration(newTextDecoration: WAT_TextDecoration);
    /**** TextShadow ****/
    get TextShadow(): WAT_TextShadow;
    set TextShadow(newTextShadow: WAT_TextShadow);
    /**** TextAlignment ****/
    get TextAlignment(): WAT_TextAlignment;
    set TextAlignment(newTextAlignment: WAT_TextAlignment);
    /**** ForegroundColor ****/
    get ForegroundColor(): WAT_Color;
    set ForegroundColor(newColor: WAT_Color);
    /**** Color (just a synonym for "ForegroundColor") ****/
    get Color(): WAT_Color;
    set Color(newColor: WAT_Color);
    /**** BackgroundColor ****/
    get BackgroundColor(): WAT_Color;
    set BackgroundColor(newColor: WAT_Color);
    /**** BackgroundTexture ****/
    get BackgroundTexture(): WAT_BackgroundTexture;
    set BackgroundTexture(newTexture: WAT_BackgroundTexture);
    /**** BorderWidths ****/
    get BorderWidths(): WAT_Dimension[];
    set BorderWidths(newBorderWidths: WAT_Dimension[]);
    /**** BorderColors ****/
    get BorderColors(): WAT_Color[];
    set BorderColors(newBorderColors: WAT_Color[]);
    /**** BorderStyles ****/
    get BorderStyles(): WAT_BorderStyle[];
    set BorderStyles(newBorderStyles: WAT_BorderStyle[]);
    /**** BorderRadii ****/
    get BorderRadii(): WAT_Dimension[];
    set BorderRadii(newBorderRadii: WAT_Dimension[]);
    /**** BoxShadow ****/
    get BoxShadow(): WAT_BoxShadow;
    set BoxShadow(newBoxShadow: WAT_BoxShadow);
    /**** Cursor ****/
    get Cursor(): WAT_Cursor;
    set Cursor(newCursor: WAT_Cursor);
    /**** customCursor ****/
    get customCursor(): WAT_customCursor | undefined;
    set customCursor(newCustomCursor: WAT_customCursor | undefined);
    /**** trigger ****/
    trigger(...ArgumentList: any): void;
}
export declare class WAT_Applet extends WAT_Visual {
    /**** Name ****/
    get Name(): string;
    set Name(newName: string);
    /**** globalVisual ****/
    globalVisual(globalName: WAT_Name): WAT_Visual;
    /**** isBeingPreserved ****/
    get isBeingPreserved(): any;
    set isBeingPreserved(newState: any);
    /**** isBeingRestored ****/
    get isBeingRestored(): any;
    set isBeingRestored(newState: any);
    /**** isBeingRemoved ****/
    get isBeingRemoved(): any;
    set isBeingRemoved(newState: any);
    /**** CardList ****/
    get CardList(): any;
    set CardList(newCardList: any);
    /**** CardLabelList ****/
    get CardLabelList(): any;
    set CardLabelList(newLabelList: any);
    /**** CardCount ****/
    get CardCount(): any;
    set CardCount(newCardCount: any);
    /**** Card ****/
    Card(CardOrNameOrIndex: WAT_Card | WAT_Name | number): WAT_Card | undefined;
    /**** CardAtIndex ****/
    CardAtIndex(Index: number): WAT_Card | undefined;
    /**** CardNamed ****/
    CardNamed(Name: WAT_Name): WAT_Card | undefined;
    /**** CardLabelled ****/
    CardLabelled(Label: WAT_Label): WAT_Card | undefined;
    /**** IndexOfCard ****/
    IndexOfCard(CardOrNameOrIndex: WAT_Card | WAT_Name | number): number;
    /**** acceptsCardAt ****/
    acceptsCardAt(CardOrNameOrIndex: WAT_Card | WAT_Name | number, InsertionPoint?: WAT_Card | WAT_Name | number): boolean;
    /**** acceptsNewCardAt - but only for an existing master ****/
    acceptsNewCardAt(Master: WAT_Name, InsertionPoint?: WAT_Card | WAT_Name | number): boolean;
    /**** newCardInsertedAt - but only for an existing master ****/
    newCardInsertedAt(Master: WAT_Name, InsertionPoint?: WAT_Card | WAT_Name | number): WAT_Card;
    /**** DuplicateOfCard ****/
    DuplicateOfCard(CardOrNameOrIndex: WAT_Card | WAT_Name | number): WAT_Card;
    /**** CardDeserializedFrom ****/
    CardDeserializedFrom(Serialization: string, InsertionPoint?: WAT_Card | WAT_Name | number): WAT_Card;
    /**** CardMayBeShiftedUp/Down ****/
    CardMayBeShiftedUp(CardOrNameOrIndex: WAT_Card | WAT_Name | number): boolean;
    CardMayBeShiftedDown(CardOrNameOrIndex: WAT_Card | WAT_Name | number): boolean;
    /**** CardMayBeShiftedTo ****/
    CardMayBeShiftedTo(CardOrNameOrIndex: WAT_Card | WAT_Name | number, InsertionPoint: WAT_Card | WAT_Name | number): boolean;
    /**** shiftCardUp/Down ****/
    shiftCardUp(CardOrNameOrIndex: WAT_Card | WAT_Name | number): void;
    shiftCardDown(CardOrNameOrIndex: WAT_Card | WAT_Name | number): void;
    /**** shiftCardTo ****/
    shiftCardTo(CardOrNameOrIndex: WAT_Card | WAT_Name | number, InsertionPoint: WAT_Card | WAT_Name | number): void;
    /**** removeCard ****/
    removeCard(CardOrNameOrIndex: WAT_Card | WAT_Name | number): void;
    /**** shownCard ****/
    get shownCard(): WAT_Card;
    set shownCard(newCard: WAT_Card);
    /**** shownCardIndex ****/
    get shownCardIndex(): number;
    set shownCardIndex(newIndex: number);
    /**** CardIsShown ****/
    CardIsShown(CardOrNameOrIndex: WAT_Card | WAT_Name | number): boolean;
    /**** showCard ****/
    showCard(CardOrNameOrIndex: WAT_Card | WAT_Name | number): void;
    /**** showFirst/Prev/Next/LastCard ****/
    showFirstCard(): void;
    showPrevCard(): void;
    showPreviousCard(): void;
    showNextCard(): void;
    showLastCard(): void;
    /**** OverlayList ****/
    get OverlayList(): any;
    set OverlayList(newOverlayList: any);
    /**** OverlayLabelList ****/
    get OverlayLabelList(): any;
    set OverlayLabelList(newLabelList: any);
    /**** OverlayCount ****/
    get OverlayCount(): any;
    set OverlayCount(newOverlayCount: any);
    /**** Overlay ****/
    Overlay(OverlayOrNameOrIndex: WAT_Overlay | WAT_Name | number): WAT_Overlay | undefined;
    /**** OverlayAtIndex ****/
    OverlayAtIndex(Index: number): WAT_Overlay | undefined;
    /**** OverlayNamed ****/
    OverlayNamed(Name: WAT_Name): WAT_Overlay | undefined;
    /**** OverlayLabelled ****/
    OverlayLabelled(Label: WAT_Label): WAT_Overlay | undefined;
    /**** IndexOfOverlay ****/
    IndexOfOverlay(OverlayOrNameOrIndex: WAT_Overlay | WAT_Name | number): number;
    /**** acceptsOverlayAt ****/
    acceptsOverlayAt(OverlayOrNameOrIndex: WAT_Overlay | WAT_Name | number, InsertionPoint?: WAT_Overlay | WAT_Name | number): boolean;
    /**** acceptsNewOverlayAt - but only for an existing master ****/
    acceptsNewOverlayAt(Master: WAT_Name, InsertionPoint?: WAT_Overlay | WAT_Name | number): boolean;
    /**** newOverlayInsertedAt - but only for an existing master ****/
    newOverlayInsertedAt(Master: WAT_Name, InsertionPoint?: WAT_Overlay | WAT_Name | number): WAT_Overlay;
    /**** DuplicateOfOverlay ****/
    DuplicateOfOverlay(OverlayOrNameOrIndex: WAT_Overlay | WAT_Name | number): WAT_Overlay;
    /**** OverlayDeserializedFrom ****/
    OverlayDeserializedFrom(Serialization: string, InsertionPoint?: WAT_Overlay | WAT_Name | number): WAT_Overlay;
    /**** OverlayMayBeShiftedUp/Down ****/
    OverlayMayBeShiftedUp(OverlayOrNameOrIndex: WAT_Overlay | WAT_Name | number): boolean;
    OverlayMayBeShiftedDown(OverlayOrNameOrIndex: WAT_Overlay | WAT_Name | number): boolean;
    /**** OverlayMayBeShiftedTo ****/
    OverlayMayBeShiftedTo(OverlayOrNameOrIndex: WAT_Overlay | WAT_Name | number, InsertionPoint: WAT_Overlay | WAT_Name | number): boolean;
    /**** shiftOverlayUp/Down ****/
    shiftOverlayUp(OverlayOrNameOrIndex: WAT_Overlay | WAT_Name | number): void;
    shiftOverlayDown(OverlayOrNameOrIndex: WAT_Overlay | WAT_Name | number): void;
    /**** shiftOverlayTo ****/
    shiftOverlayTo(OverlayOrNameOrIndex: WAT_Overlay | WAT_Name | number, InsertionPoint: WAT_Overlay | WAT_Name | number): void;
    /**** removeOverlay ****/
    removeOverlay(OverlayOrNameOrIndex: WAT_Overlay | WAT_Name | number): void;
    /**** frontmostOverlayOfClass ****/
    frontmostOverlayOfClass(ClassName: WAT_Name): WAT_Overlay | undefined;
    /**** bringOverlayToFrontOfClass ****/
    bringOverlayToFrontOfClass(OverlayOrNameOrIndex: WAT_Overlay | WAT_Name | number, ClassName: WAT_Name): void;
}
export declare abstract class WAT_Container extends WAT_Visual {
    /**** ComponentList ****/
    get ComponentList(): any;
    set ComponentList(newComponentList: any);
    /**** ComponentLabelList ****/
    get ComponentLabelList(): any;
    set ComponentLabelList(newLabelList: any);
    /**** ComponentCount ****/
    get ComponentCount(): any;
    set ComponentCount(newComponentCount: any);
    /**** Component ****/
    Component(ComponentOrNameOrIndex: WAT_Control | WAT_Compound | WAT_Name | number): WAT_Control | WAT_Compound | undefined;
    /**** ComponentAtIndex ****/
    ComponentAtIndex(Index: number): WAT_Control | WAT_Compound | undefined;
    /**** ComponentNamed ****/
    ComponentNamed(Name: WAT_Name): WAT_Control | WAT_Compound | undefined;
    /**** ComponentLabelled ****/
    ComponentLabelled(Label: WAT_Label): WAT_Control | WAT_Compound | undefined;
    /**** IndexOfComponent ****/
    IndexOfComponent(ComponentOrNameOrIndex: WAT_Control | WAT_Compound | WAT_Name | number): number;
    /**** acceptsComponentAt ****/
    acceptsComponentAt(ComponentOrNameOrIndex: WAT_Control | WAT_Compound | WAT_Name | number, InsertionPoint?: WAT_Control | WAT_Compound | WAT_Name | number): boolean;
    /**** acceptsNewComponentAt - but only for an existing master ****/
    acceptsNewComponentAt(Master: WAT_Name, InsertionPoint?: WAT_Control | WAT_Compound | WAT_Name | number): boolean;
    /**** newComponentInsertedAt - but only for an existing master ****/
    newComponentInsertedAt(Master: WAT_Name, InsertionPoint?: WAT_Control | WAT_Compound | WAT_Name | number): WAT_Control | WAT_Compound;
    /**** DuplicateOfComponent ****/
    DuplicateOfComponent(ComponentOrNameOrIndex: WAT_Control | WAT_Compound | WAT_Name | number): WAT_Control | WAT_Compound;
    /**** ComponentDeserializedFrom ****/
    ComponentDeserializedFrom(Serialization: string, InsertionPoint?: WAT_Control | WAT_Compound | WAT_Name | number): WAT_Control | WAT_Compound;
    /**** ComponentMayBeShiftedUp/Down ****/
    ComponentMayBeShiftedUp(ComponentOrNameOrIndex: WAT_Control | WAT_Compound | WAT_Name | number): boolean;
    ComponentMayBeShiftedDown(ComponentOrNameOrIndex: WAT_Control | WAT_Compound | WAT_Name | number): boolean;
    /**** ComponentMayBeShiftedTo ****/
    ComponentMayBeShiftedTo(ComponentOrNameOrIndex: WAT_Control | WAT_Compound | WAT_Name | number, InsertionPoint: WAT_Control | WAT_Compound | WAT_Name | number): boolean;
    /**** shiftComponentToTop ****/
    shiftComponentToTop(ComponentOrNameOrIndex: WAT_Control | WAT_Compound | WAT_Name | number): void;
    /**** shiftComponentUp ****/
    shiftComponentUp(ComponentOrNameOrIndex: WAT_Control | WAT_Compound | WAT_Name | number): void;
    /**** shiftComponentDown ****/
    shiftComponentDown(ComponentOrNameOrIndex: WAT_Control | WAT_Compound | WAT_Name | number): void;
    /**** shiftComponentToBottom ****/
    shiftComponentToBottom(ComponentOrNameOrIndex: WAT_Control | WAT_Compound | WAT_Name | number): void;
    /**** shiftComponentTo ****/
    shiftComponentTo(ComponentOrNameOrIndex: WAT_Control | WAT_Compound | WAT_Name | number, InsertionPoint: WAT_Control | WAT_Compound | WAT_Name | number): void;
    /**** ComponentMayBeRemoved ****/
    ComponentMayBeRemoved(ComponentOrNameOrIndex: WAT_Control | WAT_Compound | WAT_Name | number): boolean;
    /**** removeComponent ****/
    removeComponent(ComponentOrNameOrIndex: WAT_Control | WAT_Compound | WAT_Name | number): void;
}
export declare abstract class WAT_Layer extends WAT_Container {
}
export declare class WAT_Card extends WAT_Layer {
    /**** isVisible ****/
    get isVisible(): boolean;
    set isVisible(newVisibility: boolean);
    /**** show ****/
    show(): void;
    /**** mayBeDisplaced ****/
    get mayBeDisplaced(): boolean;
    set mayBeDisplaced(newSetting: boolean);
    /**** mayBeDeformed ****/
    get mayBeDeformed(): boolean;
    set mayBeDeformed(newSetting: boolean);
    /**** Index ****/
    get Index(): any;
    set Index(newIndex: any);
    /**** mayBeShiftedUp/Down ****/
    get mayBeShiftedUp(): any;
    set mayBeShiftedUp(newValue: any);
    get mayBeShiftedDown(): any;
    set mayBeShiftedDown(newValue: any);
    /**** mayBeShiftedTo ****/
    mayBeShiftedTo(InsertionPoint: WAT_Card | WAT_Name | number): boolean;
    /**** shiftUp/Down ****/
    shiftUp(): void;
    shiftDown(): void;
    /**** shiftTo ****/
    shiftTo(InsertionPoint: WAT_Card | WAT_Name | number): void;
    /**** mayBeRemoved ****/
    get mayBeRemoved(): any;
    set mayBeRemoved(newValue: any);
    /**** remove ****/
    remove(): void;
}
export declare class WAT_Overlay extends WAT_Layer {
    /**** mayBeDisplaced ****/
    get mayBeDisplaced(): boolean;
    set mayBeDisplaced(newSetting: boolean);
    /**** mayBeDeformed ****/
    get mayBeDeformed(): boolean;
    set mayBeDeformed(newSetting: boolean);
    /**** Index ****/
    get Index(): any;
    set Index(newIndex: any);
    /**** mayBeShiftedUp/Down ****/
    get mayBeShiftedUp(): any;
    set mayBeShiftedUp(newValue: any);
    get mayBeShiftedDown(): any;
    set mayBeShiftedDown(newValue: any);
    /**** mayBeShiftedTo ****/
    mayBeShiftedTo(InsertionPoint: WAT_Overlay | WAT_Name | number): boolean;
    /**** shiftUp/Down ****/
    shiftUp(): void;
    shiftDown(): void;
    /**** shiftTo ****/
    shiftTo(InsertionPoint: WAT_Overlay | WAT_Name | number): void;
    /**** mayBeRemoved ****/
    get mayBeRemoved(): any;
    set mayBeRemoved(newValue: any);
    /**** remove ****/
    remove(): void;
    /**** showAround ****/
    showAround(x: number, y: number, Constraint?: 'withinApplet' | 'withinViewport'): void;
    /**** isFrontmostOfClass ****/
    isFrontmostOfClass(ClassName: WAT_Name): boolean;
    /**** bringToFrontOfClass ****/
    bringToFrontOfClass(ClassName: WAT_Name): void;
}
export interface WAT_Component {
    Peer: HTMLElement;
    trigger: (...ArgumentList: any) => void;
    Index: number;
    mayBeDisplaced: boolean;
    mayBeDeformed: boolean;
    mayBeShiftedUp: boolean;
    mayBeShiftedDown: boolean;
    mayBeShiftedTo(InsertionPoint: WAT_Control | WAT_Compound | WAT_Name | number): boolean;
    shiftUp(): void;
    shiftDown(): void;
    shiftTo(InsertionPoint: WAT_Control | WAT_Compound | WAT_Name | number): void;
    remove(): void;
}
export declare class WAT_Compound extends WAT_Container implements WAT_Component {
    /**** mayBeDisplaced ****/
    get mayBeDisplaced(): boolean;
    set mayBeDisplaced(newSetting: boolean);
    /**** mayBeDeformed ****/
    get mayBeDeformed(): boolean;
    set mayBeDeformed(newSetting: boolean);
    /**** Index ****/
    get Index(): any;
    set Index(newIndex: any);
    /**** mayBeShiftedUp/Down ****/
    get mayBeShiftedUp(): any;
    set mayBeShiftedUp(newValue: any);
    get mayBeShiftedDown(): any;
    set mayBeShiftedDown(newValue: any);
    /**** mayBeShiftedTo ****/
    mayBeShiftedTo(InsertionPoint: WAT_Control | WAT_Compound | WAT_Name | number): boolean;
    /**** shiftUp/Down ****/
    shiftUp(): void;
    shiftDown(): void;
    /**** shiftTo ****/
    shiftTo(InsertionPoint: WAT_Control | WAT_Compound | WAT_Name | number): void;
    /**** mayBeRemoved ****/
    get mayBeRemoved(): any;
    set mayBeRemoved(newValue: any);
    /**** remove ****/
    remove(): void;
}
export declare class WAT_Control extends WAT_Visual implements WAT_Component {
    /**** mayBeDisplaced ****/
    get mayBeDisplaced(): boolean;
    set mayBeDisplaced(newSetting: boolean);
    /**** mayBeDeformed ****/
    get mayBeDeformed(): boolean;
    set mayBeDeformed(newSetting: boolean);
    /**** Index ****/
    get Index(): any;
    set Index(newIndex: any);
    /**** mayBeShiftedUp/Down ****/
    get mayBeShiftedUp(): any;
    set mayBeShiftedUp(newValue: any);
    get mayBeShiftedDown(): any;
    set mayBeShiftedDown(newValue: any);
    /**** mayBeShiftedTo ****/
    mayBeShiftedTo(InsertionPoint: WAT_Control | WAT_Compound | WAT_Name | number): boolean;
    /**** shiftUp/Down ****/
    shiftUp(): void;
    shiftDown(): void;
    /**** shiftTo ****/
    shiftTo(InsertionPoint: WAT_Control | WAT_Compound | WAT_Name | number): void;
    /**** mayBeRemoved ****/
    get mayBeRemoved(): any;
    set mayBeRemoved(newValue: any);
    /**** remove ****/
    remove(): void;
}
/**** AppletPeersInDocument ****/
export declare function AppletPeersInDocument(): HTMLElement[];
export declare type WAT_Designer = {
    startDesigning: (Target: WAT_Visual | WAT_Name, Property?: WAT_Identifier, x?: number, y?: number) => void;
    inhibitsEventsFrom: (Visual: WAT_Visual) => boolean;
};
/**** registerDesigner ****/
export declare function registerDesigner(newDesigner: WAT_Designer): void;
export declare function ready(FunctionToCall: Function): void;
export declare function running(FunctionToCall: Function): void;
export {};
