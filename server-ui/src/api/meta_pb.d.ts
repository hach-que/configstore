import * as jspb from "google-protobuf"

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

export class PartitionId extends jspb.Message {
  getNamespace(): string;
  setNamespace(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PartitionId.AsObject;
  static toObject(includeInstance: boolean, msg: PartitionId): PartitionId.AsObject;
  static serializeBinaryToWriter(message: PartitionId, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PartitionId;
  static deserializeBinaryFromReader(message: PartitionId, reader: jspb.BinaryReader): PartitionId;
}

export namespace PartitionId {
  export type AsObject = {
    namespace: string,
  }
}

export class PathElement extends jspb.Message {
  getKind(): string;
  setKind(value: string): void;

  getId(): number;
  setId(value: number): void;
  hasId(): boolean;

  getName(): string;
  setName(value: string): void;
  hasName(): boolean;

  getIdtypeCase(): PathElement.IdtypeCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PathElement.AsObject;
  static toObject(includeInstance: boolean, msg: PathElement): PathElement.AsObject;
  static serializeBinaryToWriter(message: PathElement, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PathElement;
  static deserializeBinaryFromReader(message: PathElement, reader: jspb.BinaryReader): PathElement;
}

export namespace PathElement {
  export type AsObject = {
    kind: string,
    id: number,
    name: string,
  }

  export enum IdtypeCase { 
    IDTYPE_NOT_SET = 0,
    ID = 2,
    NAME = 3,
  }
}

export class Key extends jspb.Message {
  getPartitionid(): PartitionId | undefined;
  setPartitionid(value?: PartitionId): void;
  hasPartitionid(): boolean;
  clearPartitionid(): void;

  getPathList(): Array<PathElement>;
  setPathList(value: Array<PathElement>): void;
  clearPathList(): void;
  addPath(value?: PathElement, index?: number): PathElement;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Key.AsObject;
  static toObject(includeInstance: boolean, msg: Key): Key.AsObject;
  static serializeBinaryToWriter(message: Key, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Key;
  static deserializeBinaryFromReader(message: Key, reader: jspb.BinaryReader): Key;
}

export namespace Key {
  export type AsObject = {
    partitionid?: PartitionId.AsObject,
    pathList: Array<PathElement.AsObject>,
  }
}

export class Value extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getType(): ValueType;
  setType(value: ValueType): void;

  getDoublevalue(): number;
  setDoublevalue(value: number): void;

  getInt64value(): string;
  setInt64value(value: string): void;

  getStringvalue(): string;
  setStringvalue(value: string): void;

  getTimestampvalue(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimestampvalue(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasTimestampvalue(): boolean;
  clearTimestampvalue(): void;

  getBooleanvalue(): boolean;
  setBooleanvalue(value: boolean): void;

  getBytesvalue(): Uint8Array | string;
  getBytesvalue_asU8(): Uint8Array;
  getBytesvalue_asB64(): string;
  setBytesvalue(value: Uint8Array | string): void;

  getKeyvalue(): Key | undefined;
  setKeyvalue(value?: Key): void;
  hasKeyvalue(): boolean;
  clearKeyvalue(): void;

  getUint64value(): string;
  setUint64value(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Value.AsObject;
  static toObject(includeInstance: boolean, msg: Value): Value.AsObject;
  static serializeBinaryToWriter(message: Value, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Value;
  static deserializeBinaryFromReader(message: Value, reader: jspb.BinaryReader): Value;
}

export namespace Value {
  export type AsObject = {
    id: number,
    type: ValueType,
    doublevalue: number,
    int64value: string,
    stringvalue: string,
    timestampvalue?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    booleanvalue: boolean,
    bytesvalue: Uint8Array | string,
    keyvalue?: Key.AsObject,
    uint64value: string,
  }
}

export class SchemaField extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  getType(): ValueType;
  setType(value: ValueType): void;

  getComment(): string;
  setComment(value: string): void;

  getEditor(): SchemaFieldEditorInfo | undefined;
  setEditor(value?: SchemaFieldEditorInfo): void;
  hasEditor(): boolean;
  clearEditor(): void;

  getReadonly(): boolean;
  setReadonly(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SchemaField.AsObject;
  static toObject(includeInstance: boolean, msg: SchemaField): SchemaField.AsObject;
  static serializeBinaryToWriter(message: SchemaField, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SchemaField;
  static deserializeBinaryFromReader(message: SchemaField, reader: jspb.BinaryReader): SchemaField;
}

export namespace SchemaField {
  export type AsObject = {
    id: number,
    name: string,
    type: ValueType,
    comment: string,
    editor?: SchemaFieldEditorInfo.AsObject,
    readonly: boolean,
  }
}

export class SchemaFieldEditorInfo extends jspb.Message {
  getDisplayname(): string;
  setDisplayname(value: string): void;

  getType(): SchemaFieldEditorInfoType;
  setType(value: SchemaFieldEditorInfoType): void;

  getEditorreadonly(): boolean;
  setEditorreadonly(value: boolean): void;

  getAllowedkindsList(): Array<string>;
  setAllowedkindsList(value: Array<string>): void;
  clearAllowedkindsList(): void;
  addAllowedkinds(value: string, index?: number): void;

  getUsefinancialvaluetonibblinsconversion(): boolean;
  setUsefinancialvaluetonibblinsconversion(value: boolean): void;

  getValidatorsList(): Array<SchemaFieldEditorValidator>;
  setValidatorsList(value: Array<SchemaFieldEditorValidator>): void;
  clearValidatorsList(): void;
  addValidators(value?: SchemaFieldEditorValidator, index?: number): SchemaFieldEditorValidator;

  getTextarea(): boolean;
  setTextarea(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SchemaFieldEditorInfo.AsObject;
  static toObject(includeInstance: boolean, msg: SchemaFieldEditorInfo): SchemaFieldEditorInfo.AsObject;
  static serializeBinaryToWriter(message: SchemaFieldEditorInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SchemaFieldEditorInfo;
  static deserializeBinaryFromReader(message: SchemaFieldEditorInfo, reader: jspb.BinaryReader): SchemaFieldEditorInfo;
}

export namespace SchemaFieldEditorInfo {
  export type AsObject = {
    displayname: string,
    type: SchemaFieldEditorInfoType,
    editorreadonly: boolean,
    allowedkindsList: Array<string>,
    usefinancialvaluetonibblinsconversion: boolean,
    validatorsList: Array<SchemaFieldEditorValidator.AsObject>,
    textarea: boolean,
  }
}

export class SchemaFieldEditorValidator extends jspb.Message {
  getRequired(): SchemaFieldEditorValidatorRequired | undefined;
  setRequired(value?: SchemaFieldEditorValidatorRequired): void;
  hasRequired(): boolean;
  clearRequired(): void;
  hasRequired(): boolean;

  getFixedlength(): SchemaFieldEditorValidatorFixedLength | undefined;
  setFixedlength(value?: SchemaFieldEditorValidatorFixedLength): void;
  hasFixedlength(): boolean;
  clearFixedlength(): void;
  hasFixedlength(): boolean;

  getDefault(): SchemaFieldEditorValidatorDefault | undefined;
  setDefault(value?: SchemaFieldEditorValidatorDefault): void;
  hasDefault(): boolean;
  clearDefault(): void;
  hasDefault(): boolean;

  getFormatipaddress(): SchemaFieldEditorValidatorFormatIPAddress | undefined;
  setFormatipaddress(value?: SchemaFieldEditorValidatorFormatIPAddress): void;
  hasFormatipaddress(): boolean;
  clearFormatipaddress(): void;
  hasFormatipaddress(): boolean;

  getFormatipaddressport(): SchemaFieldEditorValidatorFormatIPAddressPort | undefined;
  setFormatipaddressport(value?: SchemaFieldEditorValidatorFormatIPAddressPort): void;
  hasFormatipaddressport(): boolean;
  clearFormatipaddressport(): void;
  hasFormatipaddressport(): boolean;

  getValidatorCase(): SchemaFieldEditorValidator.ValidatorCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SchemaFieldEditorValidator.AsObject;
  static toObject(includeInstance: boolean, msg: SchemaFieldEditorValidator): SchemaFieldEditorValidator.AsObject;
  static serializeBinaryToWriter(message: SchemaFieldEditorValidator, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SchemaFieldEditorValidator;
  static deserializeBinaryFromReader(message: SchemaFieldEditorValidator, reader: jspb.BinaryReader): SchemaFieldEditorValidator;
}

export namespace SchemaFieldEditorValidator {
  export type AsObject = {
    required?: SchemaFieldEditorValidatorRequired.AsObject,
    fixedlength?: SchemaFieldEditorValidatorFixedLength.AsObject,
    pb_default?: SchemaFieldEditorValidatorDefault.AsObject,
    formatipaddress?: SchemaFieldEditorValidatorFormatIPAddress.AsObject,
    formatipaddressport?: SchemaFieldEditorValidatorFormatIPAddressPort.AsObject,
  }

  export enum ValidatorCase { 
    VALIDATOR_NOT_SET = 0,
    REQUIRED = 1,
    FIXEDLENGTH = 2,
    DEFAULT = 3,
    FORMATIPADDRESS = 4,
    FORMATIPADDRESSPORT = 5,
  }
}

export class SchemaFieldEditorValidatorRequired extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SchemaFieldEditorValidatorRequired.AsObject;
  static toObject(includeInstance: boolean, msg: SchemaFieldEditorValidatorRequired): SchemaFieldEditorValidatorRequired.AsObject;
  static serializeBinaryToWriter(message: SchemaFieldEditorValidatorRequired, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SchemaFieldEditorValidatorRequired;
  static deserializeBinaryFromReader(message: SchemaFieldEditorValidatorRequired, reader: jspb.BinaryReader): SchemaFieldEditorValidatorRequired;
}

export namespace SchemaFieldEditorValidatorRequired {
  export type AsObject = {
  }
}

export class SchemaFieldEditorValidatorFixedLength extends jspb.Message {
  getLength(): number;
  setLength(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SchemaFieldEditorValidatorFixedLength.AsObject;
  static toObject(includeInstance: boolean, msg: SchemaFieldEditorValidatorFixedLength): SchemaFieldEditorValidatorFixedLength.AsObject;
  static serializeBinaryToWriter(message: SchemaFieldEditorValidatorFixedLength, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SchemaFieldEditorValidatorFixedLength;
  static deserializeBinaryFromReader(message: SchemaFieldEditorValidatorFixedLength, reader: jspb.BinaryReader): SchemaFieldEditorValidatorFixedLength;
}

export namespace SchemaFieldEditorValidatorFixedLength {
  export type AsObject = {
    length: number,
  }
}

export class SchemaFieldEditorValidatorDefault extends jspb.Message {
  getValue(): Value | undefined;
  setValue(value?: Value): void;
  hasValue(): boolean;
  clearValue(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SchemaFieldEditorValidatorDefault.AsObject;
  static toObject(includeInstance: boolean, msg: SchemaFieldEditorValidatorDefault): SchemaFieldEditorValidatorDefault.AsObject;
  static serializeBinaryToWriter(message: SchemaFieldEditorValidatorDefault, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SchemaFieldEditorValidatorDefault;
  static deserializeBinaryFromReader(message: SchemaFieldEditorValidatorDefault, reader: jspb.BinaryReader): SchemaFieldEditorValidatorDefault;
}

export namespace SchemaFieldEditorValidatorDefault {
  export type AsObject = {
    value?: Value.AsObject,
  }
}

export class SchemaFieldEditorValidatorFormatIPAddress extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SchemaFieldEditorValidatorFormatIPAddress.AsObject;
  static toObject(includeInstance: boolean, msg: SchemaFieldEditorValidatorFormatIPAddress): SchemaFieldEditorValidatorFormatIPAddress.AsObject;
  static serializeBinaryToWriter(message: SchemaFieldEditorValidatorFormatIPAddress, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SchemaFieldEditorValidatorFormatIPAddress;
  static deserializeBinaryFromReader(message: SchemaFieldEditorValidatorFormatIPAddress, reader: jspb.BinaryReader): SchemaFieldEditorValidatorFormatIPAddress;
}

export namespace SchemaFieldEditorValidatorFormatIPAddress {
  export type AsObject = {
  }
}

export class SchemaFieldEditorValidatorFormatIPAddressPort extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SchemaFieldEditorValidatorFormatIPAddressPort.AsObject;
  static toObject(includeInstance: boolean, msg: SchemaFieldEditorValidatorFormatIPAddressPort): SchemaFieldEditorValidatorFormatIPAddressPort.AsObject;
  static serializeBinaryToWriter(message: SchemaFieldEditorValidatorFormatIPAddressPort, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SchemaFieldEditorValidatorFormatIPAddressPort;
  static deserializeBinaryFromReader(message: SchemaFieldEditorValidatorFormatIPAddressPort, reader: jspb.BinaryReader): SchemaFieldEditorValidatorFormatIPAddressPort;
}

export namespace SchemaFieldEditorValidatorFormatIPAddressPort {
  export type AsObject = {
  }
}

export class SchemaKindEditor extends jspb.Message {
  getSingular(): string;
  setSingular(value: string): void;

  getPlural(): string;
  setPlural(value: string): void;

  getRendereditordropdownwithfield(): string;
  setRendereditordropdownwithfield(value: string): void;

  getKeycomment(): string;
  setKeycomment(value: string): void;

  getSortbyfield(): string;
  setSortbyfield(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SchemaKindEditor.AsObject;
  static toObject(includeInstance: boolean, msg: SchemaKindEditor): SchemaKindEditor.AsObject;
  static serializeBinaryToWriter(message: SchemaKindEditor, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SchemaKindEditor;
  static deserializeBinaryFromReader(message: SchemaKindEditor, reader: jspb.BinaryReader): SchemaKindEditor;
}

export namespace SchemaKindEditor {
  export type AsObject = {
    singular: string,
    plural: string,
    rendereditordropdownwithfield: string,
    keycomment: string,
    sortbyfield: string,
  }
}

export class SchemaKind extends jspb.Message {
  getFieldsList(): Array<SchemaField>;
  setFieldsList(value: Array<SchemaField>): void;
  clearFieldsList(): void;
  addFields(value?: SchemaField, index?: number): SchemaField;

  getEditor(): SchemaKindEditor | undefined;
  setEditor(value?: SchemaKindEditor): void;
  hasEditor(): boolean;
  clearEditor(): void;

  getIndexesList(): Array<SchemaIndex>;
  setIndexesList(value: Array<SchemaIndex>): void;
  clearIndexesList(): void;
  addIndexes(value?: SchemaIndex, index?: number): SchemaIndex;

  getAncestorsList(): Array<string>;
  setAncestorsList(value: Array<string>): void;
  clearAncestorsList(): void;
  addAncestors(value: string, index?: number): void;

  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SchemaKind.AsObject;
  static toObject(includeInstance: boolean, msg: SchemaKind): SchemaKind.AsObject;
  static serializeBinaryToWriter(message: SchemaKind, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SchemaKind;
  static deserializeBinaryFromReader(message: SchemaKind, reader: jspb.BinaryReader): SchemaKind;
}

export namespace SchemaKind {
  export type AsObject = {
    fieldsList: Array<SchemaField.AsObject>,
    editor?: SchemaKindEditor.AsObject,
    indexesList: Array<SchemaIndex.AsObject>,
    ancestorsList: Array<string>,
    id: number,
  }
}

export class SchemaIndex extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getType(): SchemaIndexType;
  setType(value: SchemaIndexType): void;

  getComputed(): SchemaComputedIndex | undefined;
  setComputed(value?: SchemaComputedIndex): void;
  hasComputed(): boolean;
  clearComputed(): void;
  hasComputed(): boolean;

  getField(): string;
  setField(value: string): void;
  hasField(): boolean;

  getValueCase(): SchemaIndex.ValueCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SchemaIndex.AsObject;
  static toObject(includeInstance: boolean, msg: SchemaIndex): SchemaIndex.AsObject;
  static serializeBinaryToWriter(message: SchemaIndex, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SchemaIndex;
  static deserializeBinaryFromReader(message: SchemaIndex, reader: jspb.BinaryReader): SchemaIndex;
}

export namespace SchemaIndex {
  export type AsObject = {
    name: string,
    type: SchemaIndexType,
    computed?: SchemaComputedIndex.AsObject,
    field: string,
  }

  export enum ValueCase { 
    VALUE_NOT_SET = 0,
    COMPUTED = 3,
    FIELD = 4,
  }
}

export class SchemaComputedIndex extends jspb.Message {
  getFnv64a(): SchemaComputedIndexFnv64a | undefined;
  setFnv64a(value?: SchemaComputedIndexFnv64a): void;
  hasFnv64a(): boolean;
  clearFnv64a(): void;
  hasFnv64a(): boolean;

  getFnv64aPair(): SchemaComputedIndexFnv64aPair | undefined;
  setFnv64aPair(value?: SchemaComputedIndexFnv64aPair): void;
  hasFnv64aPair(): boolean;
  clearFnv64aPair(): void;
  hasFnv64aPair(): boolean;

  getFnv32a(): SchemaComputedIndexFnv32a | undefined;
  setFnv32a(value?: SchemaComputedIndexFnv32a): void;
  hasFnv32a(): boolean;
  clearFnv32a(): void;
  hasFnv32a(): boolean;

  getFnv32aPair(): SchemaComputedIndexFnv32aPair | undefined;
  setFnv32aPair(value?: SchemaComputedIndexFnv32aPair): void;
  hasFnv32aPair(): boolean;
  clearFnv32aPair(): void;
  hasFnv32aPair(): boolean;

  getAlgorithmCase(): SchemaComputedIndex.AlgorithmCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SchemaComputedIndex.AsObject;
  static toObject(includeInstance: boolean, msg: SchemaComputedIndex): SchemaComputedIndex.AsObject;
  static serializeBinaryToWriter(message: SchemaComputedIndex, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SchemaComputedIndex;
  static deserializeBinaryFromReader(message: SchemaComputedIndex, reader: jspb.BinaryReader): SchemaComputedIndex;
}

export namespace SchemaComputedIndex {
  export type AsObject = {
    fnv64a?: SchemaComputedIndexFnv64a.AsObject,
    fnv64aPair?: SchemaComputedIndexFnv64aPair.AsObject,
    fnv32a?: SchemaComputedIndexFnv32a.AsObject,
    fnv32aPair?: SchemaComputedIndexFnv32aPair.AsObject,
  }

  export enum AlgorithmCase { 
    ALGORITHM_NOT_SET = 0,
    FNV64A = 1,
    FNV64A_PAIR = 2,
    FNV32A = 3,
    FNV32A_PAIR = 4,
  }
}

export class SchemaComputedIndexFnv64a extends jspb.Message {
  getField(): string;
  setField(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SchemaComputedIndexFnv64a.AsObject;
  static toObject(includeInstance: boolean, msg: SchemaComputedIndexFnv64a): SchemaComputedIndexFnv64a.AsObject;
  static serializeBinaryToWriter(message: SchemaComputedIndexFnv64a, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SchemaComputedIndexFnv64a;
  static deserializeBinaryFromReader(message: SchemaComputedIndexFnv64a, reader: jspb.BinaryReader): SchemaComputedIndexFnv64a;
}

export namespace SchemaComputedIndexFnv64a {
  export type AsObject = {
    field: string,
  }
}

export class SchemaComputedIndexFnv64aPair extends jspb.Message {
  getField1(): string;
  setField1(value: string): void;

  getField2(): string;
  setField2(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SchemaComputedIndexFnv64aPair.AsObject;
  static toObject(includeInstance: boolean, msg: SchemaComputedIndexFnv64aPair): SchemaComputedIndexFnv64aPair.AsObject;
  static serializeBinaryToWriter(message: SchemaComputedIndexFnv64aPair, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SchemaComputedIndexFnv64aPair;
  static deserializeBinaryFromReader(message: SchemaComputedIndexFnv64aPair, reader: jspb.BinaryReader): SchemaComputedIndexFnv64aPair;
}

export namespace SchemaComputedIndexFnv64aPair {
  export type AsObject = {
    field1: string,
    field2: string,
  }
}

export class SchemaComputedIndexFnv32a extends jspb.Message {
  getField(): string;
  setField(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SchemaComputedIndexFnv32a.AsObject;
  static toObject(includeInstance: boolean, msg: SchemaComputedIndexFnv32a): SchemaComputedIndexFnv32a.AsObject;
  static serializeBinaryToWriter(message: SchemaComputedIndexFnv32a, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SchemaComputedIndexFnv32a;
  static deserializeBinaryFromReader(message: SchemaComputedIndexFnv32a, reader: jspb.BinaryReader): SchemaComputedIndexFnv32a;
}

export namespace SchemaComputedIndexFnv32a {
  export type AsObject = {
    field: string,
  }
}

export class SchemaComputedIndexFnv32aPair extends jspb.Message {
  getField1(): string;
  setField1(value: string): void;

  getField2(): string;
  setField2(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SchemaComputedIndexFnv32aPair.AsObject;
  static toObject(includeInstance: boolean, msg: SchemaComputedIndexFnv32aPair): SchemaComputedIndexFnv32aPair.AsObject;
  static serializeBinaryToWriter(message: SchemaComputedIndexFnv32aPair, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SchemaComputedIndexFnv32aPair;
  static deserializeBinaryFromReader(message: SchemaComputedIndexFnv32aPair, reader: jspb.BinaryReader): SchemaComputedIndexFnv32aPair;
}

export namespace SchemaComputedIndexFnv32aPair {
  export type AsObject = {
    field1: string,
    field2: string,
  }
}

export class Schema extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getKindsMap(): jspb.Map<string, SchemaKind>;
  clearKindsMap(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Schema.AsObject;
  static toObject(includeInstance: boolean, msg: Schema): Schema.AsObject;
  static serializeBinaryToWriter(message: Schema, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Schema;
  static deserializeBinaryFromReader(message: Schema, reader: jspb.BinaryReader): Schema;
}

export namespace Schema {
  export type AsObject = {
    name: string,
    kindsMap: Array<[string, SchemaKind.AsObject]>,
  }
}

export class GetSchemaRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSchemaRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetSchemaRequest): GetSchemaRequest.AsObject;
  static serializeBinaryToWriter(message: GetSchemaRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSchemaRequest;
  static deserializeBinaryFromReader(message: GetSchemaRequest, reader: jspb.BinaryReader): GetSchemaRequest;
}

export namespace GetSchemaRequest {
  export type AsObject = {
  }
}

export class GetSchemaResponse extends jspb.Message {
  getSchema(): Schema | undefined;
  setSchema(value?: Schema): void;
  hasSchema(): boolean;
  clearSchema(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSchemaResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetSchemaResponse): GetSchemaResponse.AsObject;
  static serializeBinaryToWriter(message: GetSchemaResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSchemaResponse;
  static deserializeBinaryFromReader(message: GetSchemaResponse, reader: jspb.BinaryReader): GetSchemaResponse;
}

export namespace GetSchemaResponse {
  export type AsObject = {
    schema?: Schema.AsObject,
  }
}

export class MetaListEntitiesRequest extends jspb.Message {
  getStart(): Uint8Array | string;
  getStart_asU8(): Uint8Array;
  getStart_asB64(): string;
  setStart(value: Uint8Array | string): void;

  getLimit(): number;
  setLimit(value: number): void;

  getKindname(): string;
  setKindname(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaListEntitiesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MetaListEntitiesRequest): MetaListEntitiesRequest.AsObject;
  static serializeBinaryToWriter(message: MetaListEntitiesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaListEntitiesRequest;
  static deserializeBinaryFromReader(message: MetaListEntitiesRequest, reader: jspb.BinaryReader): MetaListEntitiesRequest;
}

export namespace MetaListEntitiesRequest {
  export type AsObject = {
    start: Uint8Array | string,
    limit: number,
    kindname: string,
  }
}

export class MetaListEntitiesResponse extends jspb.Message {
  getNext(): Uint8Array | string;
  getNext_asU8(): Uint8Array;
  getNext_asB64(): string;
  setNext(value: Uint8Array | string): void;

  getMoreresults(): boolean;
  setMoreresults(value: boolean): void;

  getEntitiesList(): Array<MetaEntity>;
  setEntitiesList(value: Array<MetaEntity>): void;
  clearEntitiesList(): void;
  addEntities(value?: MetaEntity, index?: number): MetaEntity;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaListEntitiesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MetaListEntitiesResponse): MetaListEntitiesResponse.AsObject;
  static serializeBinaryToWriter(message: MetaListEntitiesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaListEntitiesResponse;
  static deserializeBinaryFromReader(message: MetaListEntitiesResponse, reader: jspb.BinaryReader): MetaListEntitiesResponse;
}

export namespace MetaListEntitiesResponse {
  export type AsObject = {
    next: Uint8Array | string,
    moreresults: boolean,
    entitiesList: Array<MetaEntity.AsObject>,
  }
}

export class MetaEntity extends jspb.Message {
  getKey(): Key | undefined;
  setKey(value?: Key): void;
  hasKey(): boolean;
  clearKey(): void;

  getValuesList(): Array<Value>;
  setValuesList(value: Array<Value>): void;
  clearValuesList(): void;
  addValues(value?: Value, index?: number): Value;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaEntity.AsObject;
  static toObject(includeInstance: boolean, msg: MetaEntity): MetaEntity.AsObject;
  static serializeBinaryToWriter(message: MetaEntity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaEntity;
  static deserializeBinaryFromReader(message: MetaEntity, reader: jspb.BinaryReader): MetaEntity;
}

export namespace MetaEntity {
  export type AsObject = {
    key?: Key.AsObject,
    valuesList: Array<Value.AsObject>,
  }
}

export class GetDefaultPartitionIdRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDefaultPartitionIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetDefaultPartitionIdRequest): GetDefaultPartitionIdRequest.AsObject;
  static serializeBinaryToWriter(message: GetDefaultPartitionIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDefaultPartitionIdRequest;
  static deserializeBinaryFromReader(message: GetDefaultPartitionIdRequest, reader: jspb.BinaryReader): GetDefaultPartitionIdRequest;
}

export namespace GetDefaultPartitionIdRequest {
  export type AsObject = {
  }
}

export class GetDefaultPartitionIdResponse extends jspb.Message {
  getNamespace(): string;
  setNamespace(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDefaultPartitionIdResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetDefaultPartitionIdResponse): GetDefaultPartitionIdResponse.AsObject;
  static serializeBinaryToWriter(message: GetDefaultPartitionIdResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDefaultPartitionIdResponse;
  static deserializeBinaryFromReader(message: GetDefaultPartitionIdResponse, reader: jspb.BinaryReader): GetDefaultPartitionIdResponse;
}

export namespace GetDefaultPartitionIdResponse {
  export type AsObject = {
    namespace: string,
  }
}

export class MetaGetEntityRequest extends jspb.Message {
  getKey(): Key | undefined;
  setKey(value?: Key): void;
  hasKey(): boolean;
  clearKey(): void;

  getKindname(): string;
  setKindname(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaGetEntityRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MetaGetEntityRequest): MetaGetEntityRequest.AsObject;
  static serializeBinaryToWriter(message: MetaGetEntityRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaGetEntityRequest;
  static deserializeBinaryFromReader(message: MetaGetEntityRequest, reader: jspb.BinaryReader): MetaGetEntityRequest;
}

export namespace MetaGetEntityRequest {
  export type AsObject = {
    key?: Key.AsObject,
    kindname: string,
  }
}

export class MetaGetEntityResponse extends jspb.Message {
  getEntity(): MetaEntity | undefined;
  setEntity(value?: MetaEntity): void;
  hasEntity(): boolean;
  clearEntity(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaGetEntityResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MetaGetEntityResponse): MetaGetEntityResponse.AsObject;
  static serializeBinaryToWriter(message: MetaGetEntityResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaGetEntityResponse;
  static deserializeBinaryFromReader(message: MetaGetEntityResponse, reader: jspb.BinaryReader): MetaGetEntityResponse;
}

export namespace MetaGetEntityResponse {
  export type AsObject = {
    entity?: MetaEntity.AsObject,
  }
}

export class MetaUpdateEntityRequest extends jspb.Message {
  getEntity(): MetaEntity | undefined;
  setEntity(value?: MetaEntity): void;
  hasEntity(): boolean;
  clearEntity(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaUpdateEntityRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MetaUpdateEntityRequest): MetaUpdateEntityRequest.AsObject;
  static serializeBinaryToWriter(message: MetaUpdateEntityRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaUpdateEntityRequest;
  static deserializeBinaryFromReader(message: MetaUpdateEntityRequest, reader: jspb.BinaryReader): MetaUpdateEntityRequest;
}

export namespace MetaUpdateEntityRequest {
  export type AsObject = {
    entity?: MetaEntity.AsObject,
  }
}

export class MetaUpdateEntityResponse extends jspb.Message {
  getEntity(): MetaEntity | undefined;
  setEntity(value?: MetaEntity): void;
  hasEntity(): boolean;
  clearEntity(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaUpdateEntityResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MetaUpdateEntityResponse): MetaUpdateEntityResponse.AsObject;
  static serializeBinaryToWriter(message: MetaUpdateEntityResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaUpdateEntityResponse;
  static deserializeBinaryFromReader(message: MetaUpdateEntityResponse, reader: jspb.BinaryReader): MetaUpdateEntityResponse;
}

export namespace MetaUpdateEntityResponse {
  export type AsObject = {
    entity?: MetaEntity.AsObject,
  }
}

export class MetaCreateEntityRequest extends jspb.Message {
  getEntity(): MetaEntity | undefined;
  setEntity(value?: MetaEntity): void;
  hasEntity(): boolean;
  clearEntity(): void;

  getKindname(): string;
  setKindname(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaCreateEntityRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MetaCreateEntityRequest): MetaCreateEntityRequest.AsObject;
  static serializeBinaryToWriter(message: MetaCreateEntityRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaCreateEntityRequest;
  static deserializeBinaryFromReader(message: MetaCreateEntityRequest, reader: jspb.BinaryReader): MetaCreateEntityRequest;
}

export namespace MetaCreateEntityRequest {
  export type AsObject = {
    entity?: MetaEntity.AsObject,
    kindname: string,
  }
}

export class MetaCreateEntityResponse extends jspb.Message {
  getEntity(): MetaEntity | undefined;
  setEntity(value?: MetaEntity): void;
  hasEntity(): boolean;
  clearEntity(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaCreateEntityResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MetaCreateEntityResponse): MetaCreateEntityResponse.AsObject;
  static serializeBinaryToWriter(message: MetaCreateEntityResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaCreateEntityResponse;
  static deserializeBinaryFromReader(message: MetaCreateEntityResponse, reader: jspb.BinaryReader): MetaCreateEntityResponse;
}

export namespace MetaCreateEntityResponse {
  export type AsObject = {
    entity?: MetaEntity.AsObject,
  }
}

export class MetaDeleteEntityRequest extends jspb.Message {
  getKey(): Key | undefined;
  setKey(value?: Key): void;
  hasKey(): boolean;
  clearKey(): void;

  getKindname(): string;
  setKindname(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaDeleteEntityRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MetaDeleteEntityRequest): MetaDeleteEntityRequest.AsObject;
  static serializeBinaryToWriter(message: MetaDeleteEntityRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaDeleteEntityRequest;
  static deserializeBinaryFromReader(message: MetaDeleteEntityRequest, reader: jspb.BinaryReader): MetaDeleteEntityRequest;
}

export namespace MetaDeleteEntityRequest {
  export type AsObject = {
    key?: Key.AsObject,
    kindname: string,
  }
}

export class MetaDeleteEntityResponse extends jspb.Message {
  getEntity(): MetaEntity | undefined;
  setEntity(value?: MetaEntity): void;
  hasEntity(): boolean;
  clearEntity(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaDeleteEntityResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MetaDeleteEntityResponse): MetaDeleteEntityResponse.AsObject;
  static serializeBinaryToWriter(message: MetaDeleteEntityResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaDeleteEntityResponse;
  static deserializeBinaryFromReader(message: MetaDeleteEntityResponse, reader: jspb.BinaryReader): MetaDeleteEntityResponse;
}

export namespace MetaDeleteEntityResponse {
  export type AsObject = {
    entity?: MetaEntity.AsObject,
  }
}

export class GetTransactionQueueCountRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionQueueCountRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionQueueCountRequest): GetTransactionQueueCountRequest.AsObject;
  static serializeBinaryToWriter(message: GetTransactionQueueCountRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionQueueCountRequest;
  static deserializeBinaryFromReader(message: GetTransactionQueueCountRequest, reader: jspb.BinaryReader): GetTransactionQueueCountRequest;
}

export namespace GetTransactionQueueCountRequest {
  export type AsObject = {
  }
}

export class GetTransactionQueueCountResponse extends jspb.Message {
  getTransactionqueuecount(): number;
  setTransactionqueuecount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionQueueCountResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionQueueCountResponse): GetTransactionQueueCountResponse.AsObject;
  static serializeBinaryToWriter(message: GetTransactionQueueCountResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionQueueCountResponse;
  static deserializeBinaryFromReader(message: GetTransactionQueueCountResponse, reader: jspb.BinaryReader): GetTransactionQueueCountResponse;
}

export namespace GetTransactionQueueCountResponse {
  export type AsObject = {
    transactionqueuecount: number,
  }
}

export class MetaTransaction extends jspb.Message {
  getOperationsList(): Array<MetaOperation>;
  setOperationsList(value: Array<MetaOperation>): void;
  clearOperationsList(): void;
  addOperations(value?: MetaOperation, index?: number): MetaOperation;

  getDescription(): string;
  setDescription(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaTransaction.AsObject;
  static toObject(includeInstance: boolean, msg: MetaTransaction): MetaTransaction.AsObject;
  static serializeBinaryToWriter(message: MetaTransaction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaTransaction;
  static deserializeBinaryFromReader(message: MetaTransaction, reader: jspb.BinaryReader): MetaTransaction;
}

export namespace MetaTransaction {
  export type AsObject = {
    operationsList: Array<MetaOperation.AsObject>,
    description: string,
  }
}

export class MetaOperation extends jspb.Message {
  getListrequest(): MetaListEntitiesRequest | undefined;
  setListrequest(value?: MetaListEntitiesRequest): void;
  hasListrequest(): boolean;
  clearListrequest(): void;
  hasListrequest(): boolean;

  getGetrequest(): MetaGetEntityRequest | undefined;
  setGetrequest(value?: MetaGetEntityRequest): void;
  hasGetrequest(): boolean;
  clearGetrequest(): void;
  hasGetrequest(): boolean;

  getUpdaterequest(): MetaUpdateEntityRequest | undefined;
  setUpdaterequest(value?: MetaUpdateEntityRequest): void;
  hasUpdaterequest(): boolean;
  clearUpdaterequest(): void;
  hasUpdaterequest(): boolean;

  getCreaterequest(): MetaCreateEntityRequest | undefined;
  setCreaterequest(value?: MetaCreateEntityRequest): void;
  hasCreaterequest(): boolean;
  clearCreaterequest(): void;
  hasCreaterequest(): boolean;

  getDeleterequest(): MetaDeleteEntityRequest | undefined;
  setDeleterequest(value?: MetaDeleteEntityRequest): void;
  hasDeleterequest(): boolean;
  clearDeleterequest(): void;
  hasDeleterequest(): boolean;

  getOperationCase(): MetaOperation.OperationCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaOperation.AsObject;
  static toObject(includeInstance: boolean, msg: MetaOperation): MetaOperation.AsObject;
  static serializeBinaryToWriter(message: MetaOperation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaOperation;
  static deserializeBinaryFromReader(message: MetaOperation, reader: jspb.BinaryReader): MetaOperation;
}

export namespace MetaOperation {
  export type AsObject = {
    listrequest?: MetaListEntitiesRequest.AsObject,
    getrequest?: MetaGetEntityRequest.AsObject,
    updaterequest?: MetaUpdateEntityRequest.AsObject,
    createrequest?: MetaCreateEntityRequest.AsObject,
    deleterequest?: MetaDeleteEntityRequest.AsObject,
  }

  export enum OperationCase { 
    OPERATION_NOT_SET = 0,
    LISTREQUEST = 1,
    GETREQUEST = 2,
    UPDATEREQUEST = 3,
    CREATEREQUEST = 4,
    DELETEREQUEST = 5,
  }
}

export class MetaTransactionResult extends jspb.Message {
  getOperationresultsList(): Array<MetaOperationResult>;
  setOperationresultsList(value: Array<MetaOperationResult>): void;
  clearOperationresultsList(): void;
  addOperationresults(value?: MetaOperationResult, index?: number): MetaOperationResult;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaTransactionResult.AsObject;
  static toObject(includeInstance: boolean, msg: MetaTransactionResult): MetaTransactionResult.AsObject;
  static serializeBinaryToWriter(message: MetaTransactionResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaTransactionResult;
  static deserializeBinaryFromReader(message: MetaTransactionResult, reader: jspb.BinaryReader): MetaTransactionResult;
}

export namespace MetaTransactionResult {
  export type AsObject = {
    operationresultsList: Array<MetaOperationResult.AsObject>,
  }
}

export class MetaOperationResultError extends jspb.Message {
  getErrormessage(): string;
  setErrormessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaOperationResultError.AsObject;
  static toObject(includeInstance: boolean, msg: MetaOperationResultError): MetaOperationResultError.AsObject;
  static serializeBinaryToWriter(message: MetaOperationResultError, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaOperationResultError;
  static deserializeBinaryFromReader(message: MetaOperationResultError, reader: jspb.BinaryReader): MetaOperationResultError;
}

export namespace MetaOperationResultError {
  export type AsObject = {
    errormessage: string,
  }
}

export class MetaOperationResult extends jspb.Message {
  getError(): MetaOperationResultError | undefined;
  setError(value?: MetaOperationResultError): void;
  hasError(): boolean;
  clearError(): void;

  getListresponse(): MetaListEntitiesResponse | undefined;
  setListresponse(value?: MetaListEntitiesResponse): void;
  hasListresponse(): boolean;
  clearListresponse(): void;
  hasListresponse(): boolean;

  getGetresponse(): MetaGetEntityResponse | undefined;
  setGetresponse(value?: MetaGetEntityResponse): void;
  hasGetresponse(): boolean;
  clearGetresponse(): void;
  hasGetresponse(): boolean;

  getUpdateresponse(): MetaUpdateEntityResponse | undefined;
  setUpdateresponse(value?: MetaUpdateEntityResponse): void;
  hasUpdateresponse(): boolean;
  clearUpdateresponse(): void;
  hasUpdateresponse(): boolean;

  getCreateresponse(): MetaCreateEntityResponse | undefined;
  setCreateresponse(value?: MetaCreateEntityResponse): void;
  hasCreateresponse(): boolean;
  clearCreateresponse(): void;
  hasCreateresponse(): boolean;

  getDeleteresponse(): MetaDeleteEntityResponse | undefined;
  setDeleteresponse(value?: MetaDeleteEntityResponse): void;
  hasDeleteresponse(): boolean;
  clearDeleteresponse(): void;
  hasDeleteresponse(): boolean;

  getOperationCase(): MetaOperationResult.OperationCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaOperationResult.AsObject;
  static toObject(includeInstance: boolean, msg: MetaOperationResult): MetaOperationResult.AsObject;
  static serializeBinaryToWriter(message: MetaOperationResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaOperationResult;
  static deserializeBinaryFromReader(message: MetaOperationResult, reader: jspb.BinaryReader): MetaOperationResult;
}

export namespace MetaOperationResult {
  export type AsObject = {
    error?: MetaOperationResultError.AsObject,
    listresponse?: MetaListEntitiesResponse.AsObject,
    getresponse?: MetaGetEntityResponse.AsObject,
    updateresponse?: MetaUpdateEntityResponse.AsObject,
    createresponse?: MetaCreateEntityResponse.AsObject,
    deleteresponse?: MetaDeleteEntityResponse.AsObject,
  }

  export enum OperationCase { 
    OPERATION_NOT_SET = 0,
    LISTRESPONSE = 2,
    GETRESPONSE = 3,
    UPDATERESPONSE = 4,
    CREATERESPONSE = 5,
    DELETERESPONSE = 6,
  }
}

export class WatchTransactionsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WatchTransactionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: WatchTransactionsRequest): WatchTransactionsRequest.AsObject;
  static serializeBinaryToWriter(message: WatchTransactionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WatchTransactionsRequest;
  static deserializeBinaryFromReader(message: WatchTransactionsRequest, reader: jspb.BinaryReader): WatchTransactionsRequest;
}

export namespace WatchTransactionsRequest {
  export type AsObject = {
  }
}

export class WatchTransactionsResponse extends jspb.Message {
  getBatch(): MetaTransactionBatch | undefined;
  setBatch(value?: MetaTransactionBatch): void;
  hasBatch(): boolean;
  clearBatch(): void;
  hasBatch(): boolean;

  getInitialstate(): MetaTransactionInitialState | undefined;
  setInitialstate(value?: MetaTransactionInitialState): void;
  hasInitialstate(): boolean;
  clearInitialstate(): void;
  hasInitialstate(): boolean;

  getResponseCase(): WatchTransactionsResponse.ResponseCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WatchTransactionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: WatchTransactionsResponse): WatchTransactionsResponse.AsObject;
  static serializeBinaryToWriter(message: WatchTransactionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WatchTransactionsResponse;
  static deserializeBinaryFromReader(message: WatchTransactionsResponse, reader: jspb.BinaryReader): WatchTransactionsResponse;
}

export namespace WatchTransactionsResponse {
  export type AsObject = {
    batch?: MetaTransactionBatch.AsObject,
    initialstate?: MetaTransactionInitialState.AsObject,
  }

  export enum ResponseCase { 
    RESPONSE_NOT_SET = 0,
    BATCH = 1,
    INITIALSTATE = 2,
  }
}

export class MetaTransactionRecord extends jspb.Message {
  getMutatedkeysList(): Array<Key>;
  setMutatedkeysList(value: Array<Key>): void;
  clearMutatedkeysList(): void;
  addMutatedkeys(value?: Key, index?: number): Key;

  getDeletedkeysList(): Array<Key>;
  setDeletedkeysList(value: Array<Key>): void;
  clearDeletedkeysList(): void;
  addDeletedkeys(value?: Key, index?: number): Key;

  getDatesubmitted(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setDatesubmitted(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasDatesubmitted(): boolean;
  clearDatesubmitted(): void;

  getDatecreated(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setDatecreated(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasDatecreated(): boolean;
  clearDatecreated(): void;

  getDescription(): string;
  setDescription(value: string): void;

  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaTransactionRecord.AsObject;
  static toObject(includeInstance: boolean, msg: MetaTransactionRecord): MetaTransactionRecord.AsObject;
  static serializeBinaryToWriter(message: MetaTransactionRecord, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaTransactionRecord;
  static deserializeBinaryFromReader(message: MetaTransactionRecord, reader: jspb.BinaryReader): MetaTransactionRecord;
}

export namespace MetaTransactionRecord {
  export type AsObject = {
    mutatedkeysList: Array<Key.AsObject>,
    deletedkeysList: Array<Key.AsObject>,
    datesubmitted?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    datecreated?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    description: string,
    id: string,
  }
}

export class MetaTransactionBatch extends jspb.Message {
  getMutatedentitiesList(): Array<MetaEntity>;
  setMutatedentitiesList(value: Array<MetaEntity>): void;
  clearMutatedentitiesList(): void;
  addMutatedentities(value?: MetaEntity, index?: number): MetaEntity;

  getDeletedkeysList(): Array<Key>;
  setDeletedkeysList(value: Array<Key>): void;
  clearDeletedkeysList(): void;
  addDeletedkeys(value?: Key, index?: number): Key;

  getDescription(): string;
  setDescription(value: string): void;

  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaTransactionBatch.AsObject;
  static toObject(includeInstance: boolean, msg: MetaTransactionBatch): MetaTransactionBatch.AsObject;
  static serializeBinaryToWriter(message: MetaTransactionBatch, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaTransactionBatch;
  static deserializeBinaryFromReader(message: MetaTransactionBatch, reader: jspb.BinaryReader): MetaTransactionBatch;
}

export namespace MetaTransactionBatch {
  export type AsObject = {
    mutatedentitiesList: Array<MetaEntity.AsObject>,
    deletedkeysList: Array<Key.AsObject>,
    description: string,
    id: string,
  }
}

export class MetaTransactionInitialState extends jspb.Message {
  getEntitiesList(): Array<MetaEntity>;
  setEntitiesList(value: Array<MetaEntity>): void;
  clearEntitiesList(): void;
  addEntities(value?: MetaEntity, index?: number): MetaEntity;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MetaTransactionInitialState.AsObject;
  static toObject(includeInstance: boolean, msg: MetaTransactionInitialState): MetaTransactionInitialState.AsObject;
  static serializeBinaryToWriter(message: MetaTransactionInitialState, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MetaTransactionInitialState;
  static deserializeBinaryFromReader(message: MetaTransactionInitialState, reader: jspb.BinaryReader): MetaTransactionInitialState;
}

export namespace MetaTransactionInitialState {
  export type AsObject = {
    entitiesList: Array<MetaEntity.AsObject>,
  }
}

export class ConfigstoreTraceEntry extends jspb.Message {
  getType(): ConfigstoreTraceEntry.ConfigstoreTraceEntryType;
  setType(value: ConfigstoreTraceEntry.ConfigstoreTraceEntryType): void;

  getEntity(): MetaEntity | undefined;
  setEntity(value?: MetaEntity): void;
  hasEntity(): boolean;
  clearEntity(): void;

  getKey(): Key | undefined;
  setKey(value?: Key): void;
  hasKey(): boolean;
  clearKey(): void;

  getOperatorid(): string;
  setOperatorid(value: string): void;

  getTransactionid(): string;
  setTransactionid(value: string): void;

  getRemainingtransactionqueuecount(): number;
  setRemainingtransactionqueuecount(value: number): void;

  getReconnectioncodestring(): string;
  setReconnectioncodestring(value: string): void;

  getErrorstring(): string;
  setErrorstring(value: string): void;

  getPort(): number;
  setPort(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConfigstoreTraceEntry.AsObject;
  static toObject(includeInstance: boolean, msg: ConfigstoreTraceEntry): ConfigstoreTraceEntry.AsObject;
  static serializeBinaryToWriter(message: ConfigstoreTraceEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConfigstoreTraceEntry;
  static deserializeBinaryFromReader(message: ConfigstoreTraceEntry, reader: jspb.BinaryReader): ConfigstoreTraceEntry;
}

export namespace ConfigstoreTraceEntry {
  export type AsObject = {
    type: ConfigstoreTraceEntry.ConfigstoreTraceEntryType,
    entity?: MetaEntity.AsObject,
    key?: Key.AsObject,
    operatorid: string,
    transactionid: string,
    remainingtransactionqueuecount: number,
    reconnectioncodestring: string,
    errorstring: string,
    port: number,
  }

  export enum ConfigstoreTraceEntryType { 
    INITIAL_STATE_SEND_BEGIN = 0,
    INITIAL_STATE_SEND_ENTITY = 1,
    INITIAL_STATE_SEND_END = 2,
    INITIAL_STATE_RECEIVE_BEGIN = 3,
    INITIAL_STATE_RECEIVE_ENTITY = 4,
    INITIAL_STATE_RECEIVE_END = 5,
    TRANSACTION_BATCH_SEND_BEGIN = 6,
    TRANSACTION_BATCH_SEND_MUTATED_ENTITY = 7,
    TRANSACTION_BATCH_SEND_DELETED_ENTITY_KEY = 8,
    TRANSACTION_BATCH_SEND_END = 9,
    TRANSACTION_BATCH_RECEIVE_BEGIN = 10,
    TRANSACTION_BATCH_RECEIVE_MUTATED_ENTITY = 11,
    TRANSACTION_BATCH_RECEIVE_DELETED_ENTITY_KEY = 12,
    TRANSACTION_BATCH_RECEIVE_END = 13,
    IN_MEMORY_STORE_ENTITY = 14,
    IN_MEMORY_DELETE_ENTITY = 15,
    TRANSACTION_ARRIVED = 16,
    TRANSACTION_FINISHED_PROCESSING = 17,
    TRANSACTION_STALLED = 18,
    CONFIGSTORE_CONSISTENT = 19,
    TRANSACTION_MUTATED_ENTITY_KEY = 20,
    TRANSACTION_DELETED_ENTITY_KEY = 21,
    TRANSACTION_RECONSTRUCT_APPEND_MUTATED_ENTITY = 22,
    CLIENT_CURRENTLY_DISCONNECTED_ATTEMPTING_RECONNECT = 23,
    CLIENT_GOT_EOF_ATTEMPTING_RECONNECTING = 24,
    CLIENT_GOT_NIL_BUG_IGNORING = 25,
    CLIENT_FAILED_RECONNECT = 26,
    CLIENT_CONNECTION_REESTABLISHED = 27,
    CLIENT_GOT_UNEXPECTED_CODE_ATTEMPTING_RECONNECT = 28,
    SERVER_STARTUP_GRPC_PORT = 29,
    SERVER_STARTUP_HTTP_PORT = 30,
    SERVER_GRACEFUL_SHUTDOWN = 31,
  }
}

export enum ValueType { 
  UNKNOWN = 0,
  DOUBLE = 1,
  INT64 = 2,
  STRING = 3,
  TIMESTAMP = 4,
  BOOLEAN = 5,
  BYTES = 6,
  KEY = 7,
  UINT64 = 8,
}
export enum SchemaFieldEditorInfoType { 
  DEFAULT = 0,
  PASSWORD = 1,
  LOOKUP = 2,
}
export enum SchemaIndexType { 
  UNSPECIFIED = 0,
  MEMORY = 1,
}
