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

export declare namespace ISetToken {
  export type PositionStruct = {
    component: string;
    module: string;
    unit: BigNumberish;
    positionState: BigNumberish;
    data: BytesLike;
  };

  export type PositionStructOutput = [
    string,
    string,
    BigNumber,
    number,
    string
  ] & {
    component: string;
    module: string;
    unit: BigNumber;
    positionState: number;
    data: string;
  };
}

export interface ISetTokenInterface extends utils.Interface {
  contractName: "ISetToken";
  functions: {
    "addComponent(address)": FunctionFragment;
    "addExternalPositionModule(address,address)": FunctionFragment;
    "addModule(address)": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "burn(address,uint256)": FunctionFragment;
    "editDefaultPositionUnit(address,int256)": FunctionFragment;
    "editExternalPositionData(address,address,bytes)": FunctionFragment;
    "editExternalPositionUnit(address,address,int256)": FunctionFragment;
    "editPositionMultiplier(int256)": FunctionFragment;
    "getComponents()": FunctionFragment;
    "getDefaultPositionRealUnit(address)": FunctionFragment;
    "getExternalPositionData(address,address)": FunctionFragment;
    "getExternalPositionModules(address)": FunctionFragment;
    "getExternalPositionRealUnit(address,address)": FunctionFragment;
    "getModules()": FunctionFragment;
    "getPositions()": FunctionFragment;
    "getTotalComponentRealUnits(address)": FunctionFragment;
    "initializeModule()": FunctionFragment;
    "invoke(address,uint256,bytes)": FunctionFragment;
    "isComponent(address)": FunctionFragment;
    "isExternalPositionModule(address,address)": FunctionFragment;
    "isInitializedModule(address)": FunctionFragment;
    "isLocked()": FunctionFragment;
    "isPendingModule(address)": FunctionFragment;
    "lock()": FunctionFragment;
    "manager()": FunctionFragment;
    "mint(address,uint256)": FunctionFragment;
    "moduleStates(address)": FunctionFragment;
    "positionMultiplier()": FunctionFragment;
    "removeComponent(address)": FunctionFragment;
    "removeExternalPositionModule(address,address)": FunctionFragment;
    "removeModule(address)": FunctionFragment;
    "setManager(address)": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "unlock()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addComponent",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "addExternalPositionModule",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "addModule", values: [string]): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "burn",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "editDefaultPositionUnit",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "editExternalPositionData",
    values: [string, string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "editExternalPositionUnit",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "editPositionMultiplier",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getComponents",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getDefaultPositionRealUnit",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getExternalPositionData",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getExternalPositionModules",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getExternalPositionRealUnit",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getModules",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPositions",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalComponentRealUnits",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "initializeModule",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "invoke",
    values: [string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "isComponent", values: [string]): string;
  encodeFunctionData(
    functionFragment: "isExternalPositionModule",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "isInitializedModule",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "isLocked", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "isPendingModule",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "lock", values?: undefined): string;
  encodeFunctionData(functionFragment: "manager", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "moduleStates",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "positionMultiplier",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "removeComponent",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "removeExternalPositionModule",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "removeModule",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "setManager", values: [string]): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "unlock", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "addComponent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addExternalPositionModule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addModule", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "editDefaultPositionUnit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "editExternalPositionData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "editExternalPositionUnit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "editPositionMultiplier",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getComponents",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDefaultPositionRealUnit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getExternalPositionData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getExternalPositionModules",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getExternalPositionRealUnit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getModules", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPositions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTotalComponentRealUnits",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initializeModule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "invoke", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isComponent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isExternalPositionModule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isInitializedModule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isLocked", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isPendingModule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lock", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "manager", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "moduleStates",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "positionMultiplier",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeComponent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeExternalPositionModule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeModule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setManager", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unlock", data: BytesLike): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber],
  { owner: string; spender: string; value: BigNumber }
>;

export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;

export type TransferEvent = TypedEvent<
  [string, string, BigNumber],
  { from: string; to: string; value: BigNumber }
>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface ISetToken extends BaseContract {
  contractName: "ISetToken";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ISetTokenInterface;

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
    addComponent(
      _component: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addExternalPositionModule(
      _component: string,
      _positionModule: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addModule(
      _module: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    burn(
      _account: string,
      _quantity: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    editDefaultPositionUnit(
      _component: string,
      _realUnit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    editExternalPositionData(
      _component: string,
      _positionModule: string,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    editExternalPositionUnit(
      _component: string,
      _positionModule: string,
      _realUnit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    editPositionMultiplier(
      _newMultiplier: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getComponents(overrides?: CallOverrides): Promise<[string[]]>;

    getDefaultPositionRealUnit(
      _component: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getExternalPositionData(
      _component: string,
      _positionModule: string,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getExternalPositionModules(
      _component: string,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    getExternalPositionRealUnit(
      _component: string,
      _positionModule: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getModules(overrides?: CallOverrides): Promise<[string[]]>;

    getPositions(
      overrides?: CallOverrides
    ): Promise<[ISetToken.PositionStructOutput[]]>;

    getTotalComponentRealUnits(
      _component: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    initializeModule(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    invoke(
      _target: string,
      _value: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isComponent(
      _component: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isExternalPositionModule(
      _component: string,
      _module: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isInitializedModule(
      _module: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isLocked(overrides?: CallOverrides): Promise<[boolean]>;

    isPendingModule(
      _module: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    lock(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    manager(overrides?: CallOverrides): Promise<[string]>;

    mint(
      _account: string,
      _quantity: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    moduleStates(_module: string, overrides?: CallOverrides): Promise<[number]>;

    positionMultiplier(overrides?: CallOverrides): Promise<[BigNumber]>;

    removeComponent(
      _component: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeExternalPositionModule(
      _component: string,
      _positionModule: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeModule(
      _module: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setManager(
      _manager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    transfer(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferFrom(
      from: string,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unlock(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addComponent(
    _component: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addExternalPositionModule(
    _component: string,
    _positionModule: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addModule(
    _module: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  allowance(
    owner: string,
    spender: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  approve(
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  burn(
    _account: string,
    _quantity: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  editDefaultPositionUnit(
    _component: string,
    _realUnit: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  editExternalPositionData(
    _component: string,
    _positionModule: string,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  editExternalPositionUnit(
    _component: string,
    _positionModule: string,
    _realUnit: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  editPositionMultiplier(
    _newMultiplier: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getComponents(overrides?: CallOverrides): Promise<string[]>;

  getDefaultPositionRealUnit(
    _component: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getExternalPositionData(
    _component: string,
    _positionModule: string,
    overrides?: CallOverrides
  ): Promise<string>;

  getExternalPositionModules(
    _component: string,
    overrides?: CallOverrides
  ): Promise<string[]>;

  getExternalPositionRealUnit(
    _component: string,
    _positionModule: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getModules(overrides?: CallOverrides): Promise<string[]>;

  getPositions(
    overrides?: CallOverrides
  ): Promise<ISetToken.PositionStructOutput[]>;

  getTotalComponentRealUnits(
    _component: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  initializeModule(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  invoke(
    _target: string,
    _value: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isComponent(_component: string, overrides?: CallOverrides): Promise<boolean>;

  isExternalPositionModule(
    _component: string,
    _module: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isInitializedModule(
    _module: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isLocked(overrides?: CallOverrides): Promise<boolean>;

  isPendingModule(_module: string, overrides?: CallOverrides): Promise<boolean>;

  lock(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  manager(overrides?: CallOverrides): Promise<string>;

  mint(
    _account: string,
    _quantity: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  moduleStates(_module: string, overrides?: CallOverrides): Promise<number>;

  positionMultiplier(overrides?: CallOverrides): Promise<BigNumber>;

  removeComponent(
    _component: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeExternalPositionModule(
    _component: string,
    _positionModule: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeModule(
    _module: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setManager(
    _manager: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  transfer(
    to: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferFrom(
    from: string,
    to: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unlock(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addComponent(_component: string, overrides?: CallOverrides): Promise<void>;

    addExternalPositionModule(
      _component: string,
      _positionModule: string,
      overrides?: CallOverrides
    ): Promise<void>;

    addModule(_module: string, overrides?: CallOverrides): Promise<void>;

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    burn(
      _account: string,
      _quantity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    editDefaultPositionUnit(
      _component: string,
      _realUnit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    editExternalPositionData(
      _component: string,
      _positionModule: string,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    editExternalPositionUnit(
      _component: string,
      _positionModule: string,
      _realUnit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    editPositionMultiplier(
      _newMultiplier: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getComponents(overrides?: CallOverrides): Promise<string[]>;

    getDefaultPositionRealUnit(
      _component: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getExternalPositionData(
      _component: string,
      _positionModule: string,
      overrides?: CallOverrides
    ): Promise<string>;

    getExternalPositionModules(
      _component: string,
      overrides?: CallOverrides
    ): Promise<string[]>;

    getExternalPositionRealUnit(
      _component: string,
      _positionModule: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getModules(overrides?: CallOverrides): Promise<string[]>;

    getPositions(
      overrides?: CallOverrides
    ): Promise<ISetToken.PositionStructOutput[]>;

    getTotalComponentRealUnits(
      _component: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initializeModule(overrides?: CallOverrides): Promise<void>;

    invoke(
      _target: string,
      _value: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    isComponent(
      _component: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isExternalPositionModule(
      _component: string,
      _module: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isInitializedModule(
      _module: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isLocked(overrides?: CallOverrides): Promise<boolean>;

    isPendingModule(
      _module: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    lock(overrides?: CallOverrides): Promise<void>;

    manager(overrides?: CallOverrides): Promise<string>;

    mint(
      _account: string,
      _quantity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    moduleStates(_module: string, overrides?: CallOverrides): Promise<number>;

    positionMultiplier(overrides?: CallOverrides): Promise<BigNumber>;

    removeComponent(
      _component: string,
      overrides?: CallOverrides
    ): Promise<void>;

    removeExternalPositionModule(
      _component: string,
      _positionModule: string,
      overrides?: CallOverrides
    ): Promise<void>;

    removeModule(_module: string, overrides?: CallOverrides): Promise<void>;

    setManager(_manager: string, overrides?: CallOverrides): Promise<void>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      to: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferFrom(
      from: string,
      to: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    unlock(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      spender?: string | null,
      value?: null
    ): ApprovalEventFilter;
    Approval(
      owner?: string | null,
      spender?: string | null,
      value?: null
    ): ApprovalEventFilter;

    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null
    ): TransferEventFilter;
    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null
    ): TransferEventFilter;
  };

  estimateGas: {
    addComponent(
      _component: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addExternalPositionModule(
      _component: string,
      _positionModule: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addModule(
      _module: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    burn(
      _account: string,
      _quantity: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    editDefaultPositionUnit(
      _component: string,
      _realUnit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    editExternalPositionData(
      _component: string,
      _positionModule: string,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    editExternalPositionUnit(
      _component: string,
      _positionModule: string,
      _realUnit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    editPositionMultiplier(
      _newMultiplier: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getComponents(overrides?: CallOverrides): Promise<BigNumber>;

    getDefaultPositionRealUnit(
      _component: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getExternalPositionData(
      _component: string,
      _positionModule: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getExternalPositionModules(
      _component: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getExternalPositionRealUnit(
      _component: string,
      _positionModule: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getModules(overrides?: CallOverrides): Promise<BigNumber>;

    getPositions(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalComponentRealUnits(
      _component: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initializeModule(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    invoke(
      _target: string,
      _value: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isComponent(
      _component: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isExternalPositionModule(
      _component: string,
      _module: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isInitializedModule(
      _module: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isLocked(overrides?: CallOverrides): Promise<BigNumber>;

    isPendingModule(
      _module: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lock(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    manager(overrides?: CallOverrides): Promise<BigNumber>;

    mint(
      _account: string,
      _quantity: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    moduleStates(
      _module: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    positionMultiplier(overrides?: CallOverrides): Promise<BigNumber>;

    removeComponent(
      _component: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeExternalPositionModule(
      _component: string,
      _positionModule: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeModule(
      _module: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setManager(
      _manager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferFrom(
      from: string,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unlock(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addComponent(
      _component: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addExternalPositionModule(
      _component: string,
      _positionModule: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addModule(
      _module: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    burn(
      _account: string,
      _quantity: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    editDefaultPositionUnit(
      _component: string,
      _realUnit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    editExternalPositionData(
      _component: string,
      _positionModule: string,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    editExternalPositionUnit(
      _component: string,
      _positionModule: string,
      _realUnit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    editPositionMultiplier(
      _newMultiplier: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getComponents(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getDefaultPositionRealUnit(
      _component: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getExternalPositionData(
      _component: string,
      _positionModule: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getExternalPositionModules(
      _component: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getExternalPositionRealUnit(
      _component: string,
      _positionModule: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getModules(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPositions(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTotalComponentRealUnits(
      _component: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initializeModule(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    invoke(
      _target: string,
      _value: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isComponent(
      _component: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isExternalPositionModule(
      _component: string,
      _module: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isInitializedModule(
      _module: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isLocked(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isPendingModule(
      _module: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lock(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    manager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mint(
      _account: string,
      _quantity: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    moduleStates(
      _module: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    positionMultiplier(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeComponent(
      _component: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeExternalPositionModule(
      _component: string,
      _positionModule: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeModule(
      _module: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setManager(
      _manager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transfer(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferFrom(
      from: string,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unlock(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
