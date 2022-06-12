/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface TestInterface extends utils.Interface {
  contractName: "Test";
  functions: {
    "IS_TEST()": FunctionFragment;
    "bound(uint256,uint256,uint256)": FunctionFragment;
    "deal(address,address,uint256)": FunctionFragment;
    "deployCode(string,bytes)": FunctionFragment;
    "failed()": FunctionFragment;
    "hoax(address)": FunctionFragment;
    "rewind(uint256)": FunctionFragment;
    "skip(uint256)": FunctionFragment;
    "startHoax(address,uint256)": FunctionFragment;
    "tip(address,address,uint256)": FunctionFragment;
    "vm()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "IS_TEST", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "bound",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "deal",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "deployCode",
    values: [string, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "failed", values?: undefined): string;
  encodeFunctionData(functionFragment: "hoax", values: [string]): string;
  encodeFunctionData(
    functionFragment: "rewind",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "skip", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "startHoax",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tip",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "vm", values?: undefined): string;

  decodeFunctionResult(functionFragment: "IS_TEST", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "bound", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deal", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deployCode", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "failed", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hoax", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rewind", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "skip", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "startHoax", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tip", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "vm", data: BytesLike): Result;

  events: {
    "WARNING_Deprecated(string)": EventFragment;
    "log(string)": EventFragment;
    "log_address(address)": EventFragment;
    "log_bytes(bytes)": EventFragment;
    "log_bytes32(bytes32)": EventFragment;
    "log_int(int256)": EventFragment;
    "log_named_address(string,address)": EventFragment;
    "log_named_bytes(string,bytes)": EventFragment;
    "log_named_bytes32(string,bytes32)": EventFragment;
    "log_named_decimal_int(string,int256,uint256)": EventFragment;
    "log_named_decimal_uint(string,uint256,uint256)": EventFragment;
    "log_named_int(string,int256)": EventFragment;
    "log_named_string(string,string)": EventFragment;
    "log_named_uint(string,uint256)": EventFragment;
    "log_string(string)": EventFragment;
    "log_uint(uint256)": EventFragment;
    "logs(bytes)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "WARNING_Deprecated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "log"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "log_address"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "log_bytes"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "log_bytes32"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "log_int"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "log_named_address"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "log_named_bytes"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "log_named_bytes32"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "log_named_decimal_int"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "log_named_decimal_uint"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "log_named_int"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "log_named_string"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "log_named_uint"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "log_string"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "log_uint"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "logs"): EventFragment;
}

export type WARNING_DeprecatedEvent = TypedEvent<[string], { msg: string }>;

export type WARNING_DeprecatedEventFilter =
  TypedEventFilter<WARNING_DeprecatedEvent>;

export type logEvent = TypedEvent<[string], { arg0: string }>;

export type logEventFilter = TypedEventFilter<logEvent>;

export type log_addressEvent = TypedEvent<[string], { arg0: string }>;

export type log_addressEventFilter = TypedEventFilter<log_addressEvent>;

export type log_bytesEvent = TypedEvent<[string], { arg0: string }>;

export type log_bytesEventFilter = TypedEventFilter<log_bytesEvent>;

export type log_bytes32Event = TypedEvent<[string], { arg0: string }>;

export type log_bytes32EventFilter = TypedEventFilter<log_bytes32Event>;

export type log_intEvent = TypedEvent<[BigNumber], { arg0: BigNumber }>;

export type log_intEventFilter = TypedEventFilter<log_intEvent>;

export type log_named_addressEvent = TypedEvent<
  [string, string],
  { key: string; val: string }
>;

export type log_named_addressEventFilter =
  TypedEventFilter<log_named_addressEvent>;

export type log_named_bytesEvent = TypedEvent<
  [string, string],
  { key: string; val: string }
>;

export type log_named_bytesEventFilter = TypedEventFilter<log_named_bytesEvent>;

export type log_named_bytes32Event = TypedEvent<
  [string, string],
  { key: string; val: string }
>;

export type log_named_bytes32EventFilter =
  TypedEventFilter<log_named_bytes32Event>;

export type log_named_decimal_intEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  { key: string; val: BigNumber; decimals: BigNumber }
>;

export type log_named_decimal_intEventFilter =
  TypedEventFilter<log_named_decimal_intEvent>;

export type log_named_decimal_uintEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  { key: string; val: BigNumber; decimals: BigNumber }
>;

export type log_named_decimal_uintEventFilter =
  TypedEventFilter<log_named_decimal_uintEvent>;

export type log_named_intEvent = TypedEvent<
  [string, BigNumber],
  { key: string; val: BigNumber }
>;

export type log_named_intEventFilter = TypedEventFilter<log_named_intEvent>;

export type log_named_stringEvent = TypedEvent<
  [string, string],
  { key: string; val: string }
>;

export type log_named_stringEventFilter =
  TypedEventFilter<log_named_stringEvent>;

export type log_named_uintEvent = TypedEvent<
  [string, BigNumber],
  { key: string; val: BigNumber }
>;

export type log_named_uintEventFilter = TypedEventFilter<log_named_uintEvent>;

export type log_stringEvent = TypedEvent<[string], { arg0: string }>;

export type log_stringEventFilter = TypedEventFilter<log_stringEvent>;

export type log_uintEvent = TypedEvent<[BigNumber], { arg0: BigNumber }>;

export type log_uintEventFilter = TypedEventFilter<log_uintEvent>;

export type logsEvent = TypedEvent<[string], { arg0: string }>;

export type logsEventFilter = TypedEventFilter<logsEvent>;

export interface Test extends BaseContract {
  contractName: "Test";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TestInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    IS_TEST(overrides?: CallOverrides): Promise<[boolean]>;

    bound(
      x: BigNumberish,
      min: BigNumberish,
      max: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "deal(address,address,uint256)"(
      token: string,
      to: string,
      give: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "deal(address,address,uint256,bool)"(
      token: string,
      to: string,
      give: BigNumberish,
      adjust: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "deal(address,uint256)"(
      to: string,
      give: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "deployCode(string,bytes)"(
      what: string,
      args: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "deployCode(string)"(
      what: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    failed(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "hoax(address)"(
      who: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "hoax(address,address)"(
      who: string,
      origin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "hoax(address,address,uint256)"(
      who: string,
      origin: string,
      give: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "hoax(address,uint256)"(
      who: string,
      give: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rewind(
      time: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    skip(
      time: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "startHoax(address,uint256)"(
      who: string,
      give: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "startHoax(address,address,uint256)"(
      who: string,
      origin: string,
      give: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "startHoax(address)"(
      who: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "startHoax(address,address)"(
      who: string,
      origin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    tip(
      token: string,
      to: string,
      give: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    vm(overrides?: CallOverrides): Promise<[string]>;
  };

  IS_TEST(overrides?: CallOverrides): Promise<boolean>;

  bound(
    x: BigNumberish,
    min: BigNumberish,
    max: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "deal(address,address,uint256)"(
    token: string,
    to: string,
    give: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "deal(address,address,uint256,bool)"(
    token: string,
    to: string,
    give: BigNumberish,
    adjust: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "deal(address,uint256)"(
    to: string,
    give: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "deployCode(string,bytes)"(
    what: string,
    args: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "deployCode(string)"(
    what: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  failed(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "hoax(address)"(
    who: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "hoax(address,address)"(
    who: string,
    origin: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "hoax(address,address,uint256)"(
    who: string,
    origin: string,
    give: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "hoax(address,uint256)"(
    who: string,
    give: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rewind(
    time: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  skip(
    time: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "startHoax(address,uint256)"(
    who: string,
    give: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "startHoax(address,address,uint256)"(
    who: string,
    origin: string,
    give: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "startHoax(address)"(
    who: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "startHoax(address,address)"(
    who: string,
    origin: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  tip(
    token: string,
    to: string,
    give: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  vm(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    IS_TEST(overrides?: CallOverrides): Promise<boolean>;

    bound(
      x: BigNumberish,
      min: BigNumberish,
      max: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "deal(address,address,uint256)"(
      token: string,
      to: string,
      give: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "deal(address,address,uint256,bool)"(
      token: string,
      to: string,
      give: BigNumberish,
      adjust: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    "deal(address,uint256)"(
      to: string,
      give: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "deployCode(string,bytes)"(
      what: string,
      args: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "deployCode(string)"(
      what: string,
      overrides?: CallOverrides
    ): Promise<string>;

    failed(overrides?: CallOverrides): Promise<boolean>;

    "hoax(address)"(who: string, overrides?: CallOverrides): Promise<void>;

    "hoax(address,address)"(
      who: string,
      origin: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "hoax(address,address,uint256)"(
      who: string,
      origin: string,
      give: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "hoax(address,uint256)"(
      who: string,
      give: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    rewind(time: BigNumberish, overrides?: CallOverrides): Promise<void>;

    skip(time: BigNumberish, overrides?: CallOverrides): Promise<void>;

    "startHoax(address,uint256)"(
      who: string,
      give: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "startHoax(address,address,uint256)"(
      who: string,
      origin: string,
      give: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "startHoax(address)"(who: string, overrides?: CallOverrides): Promise<void>;

    "startHoax(address,address)"(
      who: string,
      origin: string,
      overrides?: CallOverrides
    ): Promise<void>;

    tip(
      token: string,
      to: string,
      give: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    vm(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "WARNING_Deprecated(string)"(msg?: null): WARNING_DeprecatedEventFilter;
    WARNING_Deprecated(msg?: null): WARNING_DeprecatedEventFilter;

    "log(string)"(arg0?: null): logEventFilter;
    log(arg0?: null): logEventFilter;

    "log_address(address)"(arg0?: null): log_addressEventFilter;
    log_address(arg0?: null): log_addressEventFilter;

    "log_bytes(bytes)"(arg0?: null): log_bytesEventFilter;
    log_bytes(arg0?: null): log_bytesEventFilter;

    "log_bytes32(bytes32)"(arg0?: null): log_bytes32EventFilter;
    log_bytes32(arg0?: null): log_bytes32EventFilter;

    "log_int(int256)"(arg0?: null): log_intEventFilter;
    log_int(arg0?: null): log_intEventFilter;

    "log_named_address(string,address)"(
      key?: null,
      val?: null
    ): log_named_addressEventFilter;
    log_named_address(key?: null, val?: null): log_named_addressEventFilter;

    "log_named_bytes(string,bytes)"(
      key?: null,
      val?: null
    ): log_named_bytesEventFilter;
    log_named_bytes(key?: null, val?: null): log_named_bytesEventFilter;

    "log_named_bytes32(string,bytes32)"(
      key?: null,
      val?: null
    ): log_named_bytes32EventFilter;
    log_named_bytes32(key?: null, val?: null): log_named_bytes32EventFilter;

    "log_named_decimal_int(string,int256,uint256)"(
      key?: null,
      val?: null,
      decimals?: null
    ): log_named_decimal_intEventFilter;
    log_named_decimal_int(
      key?: null,
      val?: null,
      decimals?: null
    ): log_named_decimal_intEventFilter;

    "log_named_decimal_uint(string,uint256,uint256)"(
      key?: null,
      val?: null,
      decimals?: null
    ): log_named_decimal_uintEventFilter;
    log_named_decimal_uint(
      key?: null,
      val?: null,
      decimals?: null
    ): log_named_decimal_uintEventFilter;

    "log_named_int(string,int256)"(
      key?: null,
      val?: null
    ): log_named_intEventFilter;
    log_named_int(key?: null, val?: null): log_named_intEventFilter;

    "log_named_string(string,string)"(
      key?: null,
      val?: null
    ): log_named_stringEventFilter;
    log_named_string(key?: null, val?: null): log_named_stringEventFilter;

    "log_named_uint(string,uint256)"(
      key?: null,
      val?: null
    ): log_named_uintEventFilter;
    log_named_uint(key?: null, val?: null): log_named_uintEventFilter;

    "log_string(string)"(arg0?: null): log_stringEventFilter;
    log_string(arg0?: null): log_stringEventFilter;

    "log_uint(uint256)"(arg0?: null): log_uintEventFilter;
    log_uint(arg0?: null): log_uintEventFilter;

    "logs(bytes)"(arg0?: null): logsEventFilter;
    logs(arg0?: null): logsEventFilter;
  };

  estimateGas: {
    IS_TEST(overrides?: CallOverrides): Promise<BigNumber>;

    bound(
      x: BigNumberish,
      min: BigNumberish,
      max: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "deal(address,address,uint256)"(
      token: string,
      to: string,
      give: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "deal(address,address,uint256,bool)"(
      token: string,
      to: string,
      give: BigNumberish,
      adjust: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "deal(address,uint256)"(
      to: string,
      give: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "deployCode(string,bytes)"(
      what: string,
      args: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "deployCode(string)"(
      what: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    failed(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "hoax(address)"(
      who: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "hoax(address,address)"(
      who: string,
      origin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "hoax(address,address,uint256)"(
      who: string,
      origin: string,
      give: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "hoax(address,uint256)"(
      who: string,
      give: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rewind(
      time: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    skip(
      time: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "startHoax(address,uint256)"(
      who: string,
      give: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "startHoax(address,address,uint256)"(
      who: string,
      origin: string,
      give: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "startHoax(address)"(
      who: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "startHoax(address,address)"(
      who: string,
      origin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    tip(
      token: string,
      to: string,
      give: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    vm(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    IS_TEST(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    bound(
      x: BigNumberish,
      min: BigNumberish,
      max: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "deal(address,address,uint256)"(
      token: string,
      to: string,
      give: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "deal(address,address,uint256,bool)"(
      token: string,
      to: string,
      give: BigNumberish,
      adjust: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "deal(address,uint256)"(
      to: string,
      give: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "deployCode(string,bytes)"(
      what: string,
      args: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "deployCode(string)"(
      what: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    failed(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "hoax(address)"(
      who: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "hoax(address,address)"(
      who: string,
      origin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "hoax(address,address,uint256)"(
      who: string,
      origin: string,
      give: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "hoax(address,uint256)"(
      who: string,
      give: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rewind(
      time: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    skip(
      time: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "startHoax(address,uint256)"(
      who: string,
      give: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "startHoax(address,address,uint256)"(
      who: string,
      origin: string,
      give: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "startHoax(address)"(
      who: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "startHoax(address,address)"(
      who: string,
      origin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    tip(
      token: string,
      to: string,
      give: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    vm(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
