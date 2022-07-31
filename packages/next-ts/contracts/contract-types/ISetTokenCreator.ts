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
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface ISetTokenCreatorInterface extends utils.Interface {
  contractName: "ISetTokenCreator";
  functions: {
    "create(address[],int256[],address[],address,string,string)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "create",
    values: [string[], BigNumberish[], string[], string, string, string]
  ): string;

  decodeFunctionResult(functionFragment: "create", data: BytesLike): Result;

  events: {};
}

export interface ISetTokenCreator extends BaseContract {
  contractName: "ISetTokenCreator";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ISetTokenCreatorInterface;

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
    create(
      _components: string[],
      _units: BigNumberish[],
      _modules: string[],
      _manager: string,
      _name: string,
      _symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  create(
    _components: string[],
    _units: BigNumberish[],
    _modules: string[],
    _manager: string,
    _name: string,
    _symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    create(
      _components: string[],
      _units: BigNumberish[],
      _modules: string[],
      _manager: string,
      _name: string,
      _symbol: string,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    create(
      _components: string[],
      _units: BigNumberish[],
      _modules: string[],
      _manager: string,
      _name: string,
      _symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    create(
      _components: string[],
      _units: BigNumberish[],
      _modules: string[],
      _manager: string,
      _name: string,
      _symbol: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
