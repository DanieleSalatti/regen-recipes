/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { StdStorage, StdStorageInterface } from "../StdStorage";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "who",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes4",
        name: "fsig",
        type: "bytes4",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "keysHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "slot",
        type: "uint256",
      },
    ],
    name: "SlotFound",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "who",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "slot",
        type: "uint256",
      },
    ],
    name: "WARNING_UninitedSlot",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "b",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "offset",
        type: "uint256",
      },
    ],
    name: "bytesToBytes32",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x61025961003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100355760003560e01c8063535849391461003a575b600080fd5b61004d6100483660046100f2565b61005f565b60405190815260200160405180910390f35b60008060006020855111610074578451610077565b60205b905060005b818110156100d25761008f8160086101bd565b8661009a83886101dc565b815181106100aa576100aa6101f4565b01602001516001600160f81b031916901c9290921791806100ca8161020a565b91505061007c565b5090949350505050565b634e487b7160e01b600052604160045260246000fd5b6000806040838503121561010557600080fd5b823567ffffffffffffffff8082111561011d57600080fd5b818501915085601f83011261013157600080fd5b813581811115610143576101436100dc565b604051601f8201601f19908116603f0116810190838211818310171561016b5761016b6100dc565b8160405282815288602084870101111561018457600080fd5b826020860160208301376000602093820184015298969091013596505050505050565b634e487b7160e01b600052601160045260246000fd5b60008160001904831182151516156101d7576101d76101a7565b500290565b600082198211156101ef576101ef6101a7565b500190565b634e487b7160e01b600052603260045260246000fd5b60006001820161021c5761021c6101a7565b506001019056fea2646970667358221220ff4a137c1a158c0e4d8c4db4d0c5438fd281db34715978dfb0ae631244b9dc7264736f6c634300080f0033";

type StdStorageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StdStorageConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StdStorage__factory extends ContractFactory {
  constructor(...args: StdStorageConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "StdStorage";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<StdStorage> {
    return super.deploy(overrides || {}) as Promise<StdStorage>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): StdStorage {
    return super.attach(address) as StdStorage;
  }
  connect(signer: Signer): StdStorage__factory {
    return super.connect(signer) as StdStorage__factory;
  }
  static readonly contractName: "StdStorage";
  public readonly contractName: "StdStorage";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StdStorageInterface {
    return new utils.Interface(_abi) as StdStorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StdStorage {
    return new Contract(address, _abi, signerOrProvider) as StdStorage;
  }
}
