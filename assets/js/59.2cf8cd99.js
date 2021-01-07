(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{647:function(e,t,a){"use strict";a.r(t);var s=a(0),c=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"keeper"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#keeper"}},[e._v("#")]),e._v(" Keeper")]),e._v(" "),a("h2",{attrs:{id:"structure"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#structure"}},[e._v("#")]),e._v(" Structure")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"CnR5cGUgVHhFbmNvZGVyIGZ1bmMoZGF0YSBpbnRlcmZhY2V7fSkgKFtdYnl0ZSwgZXJyb3IpCgp0eXBlIEtlZXBlciBzdHJ1Y3QgewogICAuLi4KICAgdHhFbmNvZGVycyBtYXBbc3RyaW5nXXR5cGVzLlR4RW5jb2RlcgogICAuLi4KICAgcm91dGVyIHR5cGVzLlJvdXRlcgp9Cg=="}}),e._v(" "),a("p",[e._v("The most important part of the IBC account keeper, as shown above, is the "),a("strong",[e._v("map of tx encoder")]),e._v(" and the "),a("strong",[e._v("router")]),e._v(". Because ICS-027 specification defines that the chain can send an arbitrary tx bytes to the counterparty chain, both chains must define the way that they process the caller's requests or make the tx bytes that the callee can process.")]),e._v(" "),a("p",[e._v("The "),a("code",[e._v("TxEncoder")]),e._v(" serializes the source chain's tx bytes from any data. And the map of "),a("code",[e._v("TxEncoder")]),e._v(" has the key, such as chain-id and keeper, which the keeper uses to send packets. Therefore, it is necessary to know the which source chain's transaction is being executed.")]),e._v(" "),a("p",[a("code",[e._v("SerializeCosmosTx(cdc codec.BinaryMarshaler, registry codectypes.InterfaceRegistry)")]),e._v(" provides a way to serialize the tx bytes from messages if the destination chain is based on the Cosmos-SDK.")]),e._v(" "),a("p",[e._v("The router is used to delegate the process of handling the message to a module. When a packet which requests a set of transaction bytes to be run is passed, the router deserializes the tx bytes and passes the message to the handler. The keeper checks the result of each message, and if any message returns an error, the entire transaction is aborted, and state change rolled back.")]),e._v(" "),a("p",[a("code",[e._v("TryRunTx(ctx sdk.Context, sourcePort, sourceChannel, typ string, data interface{}, timeoutHeight clienttypes.Height, timeoutTimestamp uint64)")]),e._v(" method is used to request transactions to be run on the destination chain. This method uses the "),a("code",[e._v("typ")]),e._v(" parameter from the "),a("code",[e._v("txEncoders map")]),e._v("'s key to find the right "),a("code",[e._v("txEncoder")]),e._v(". If the "),a("code",[e._v("txEncoder")]),e._v(" exists, the transaction is serialized and a RUNTX packet is sent to the destination chain. The TryRunTx also returns the virtual txHash which is used in the 'Hook' section shown below. This virtual txHash is not related to the actual on-chain transaction, but only 'virtually' created so transactions requested by the Hook can be identified.")]),e._v(" "),a("h3",{attrs:{id:"ibc-packets"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ibc-packets"}},[e._v("#")]),e._v(" IBC Packets")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"",base64:"CmVudW0gVHlwZSB7CiAgICBSRUdJU1RFUiA9IDA7CiAgICBSVU5UWCA9IDE7Cn0KCm1lc3NhZ2UgSUJDQWNjb3VudFBhY2tldERhdGEgewogICAgVHlwZSB0eXBlID0gMTsKICAgIGJ5dGVzIGRhdGEgPSAyOwp9CgptZXNzYWdlIElCQ0FjY291bnRQYWNrZXRBY2tub3dsZWRnZW1lbnQgewogICAgVHlwZSB0eXBlID0gMTsKICAgIHN0cmluZyBjaGFpbklEID0gMjsKICAgIHVpbnQzMiBjb2RlID0gMzsKICAgIHN0cmluZyBlcnJvciA9IDQ7Cn0K"}}),e._v(" "),a("p",[e._v("The example above shows the IBC packets that are used in ICS-027. "),a("code",[e._v("Type")]),e._v(" indicates what action the packet is performing. When a "),a("code",[e._v("REGISTER")]),e._v(" packet type is delivered, the counterparty chain will create an account with the address using the hash of {destPort}/{destChannel}/{packet.data}, assuming a duplicate prior account doesn't exist.")]),e._v(" "),a("p",[e._v("If the account is created successfully, it returns an acknowledgement packet to the origin chain with type "),a("code",[e._v("REGISTER")]),e._v(" and code "),a("code",[e._v("0")]),e._v(". If else, it returns the acknowledgement packet with type "),a("code",[e._v("REGISTER")]),e._v(" and code and result according to occured error.")]),e._v(" "),a("p",[e._v("When a "),a("code",[e._v("RUNTX")]),e._v(" type packet is delivered, the counterparty chain will deserialize the tx bytes (packet's data field) in a predefined way.")]),e._v(" "),a("p",[e._v("In this implementation of ICS27 for the Cosmos-SDK, it deserializes the tx bytes into slices of messages and gets the handler from the router and executes and checks the result like described above.")]),e._v(" "),a("p",[e._v("If the all messages are successful, it returns the acknowledgment packet to the chain with type "),a("code",[e._v("RUNTX")]),e._v(" and code "),a("code",[e._v("0")]),e._v(". If else, it returns the acknowledgement packet with type "),a("code",[e._v("RUNTX")]),e._v(" and the code and error of first failed message.")]),e._v(" "),a("h3",{attrs:{id:"hook"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#hook"}},[e._v("#")]),e._v(" Hook")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"CnR5cGUgSUJDQWNjb3VudEhvb2tzIGludGVyZmFjZSB7CiAgICBPbkFjY291bnRDcmVhdGVkKGN0eCBzZGsuQ29udGV4dCwgc291cmNlUG9ydCwgc291cmNlQ2hhbm5lbCBzdHJpbmcsIGFkZHJlc3Mgc2RrLkFjY0FkZHJlc3MpCiAgICBPblR4U3VjY2VlZGVkKGN0eCBzZGsuQ29udGV4dCwgc291cmNlUG9ydCwgc291cmNlQ2hhbm5lbCBzdHJpbmcsIHR4SGFzaCBbXWJ5dGUsIHR4Qnl0ZXMgW11ieXRlKQogICAgT25UeEZhaWxlZChjdHggc2RrLkNvbnRleHQsIHNvdXJjZVBvcnQsIHNvdXJjZUNoYW5uZWwgc3RyaW5nLCB0eEhhc2ggW11ieXRlLCB0eEJ5dGVzIFtdYnl0ZSkKfQo="}}),e._v(" "),a("p",[e._v("The example above shows the hook for helping the developer that uses IBC account keeper.")]),e._v(" "),a("p",[e._v("The hook lets the developer know: When the IBC account has been successfully created on the counterparty chain.")]),e._v(" "),a("p",[e._v("After sending the packet with a "),a("code",[e._v("IBCAccountPacketData")]),e._v(" which type is "),a("code",[e._v("REGISTER")]),e._v(", if the acknowledgement packet with the type "),a("code",[e._v("REGISTER")]),e._v(" and code "),a("code",[e._v("0")]),e._v(" is delivered, "),a("code",[e._v("OnAccountCreated")]),e._v(" is executed with the counterparty chain's chain-id and address.")]),e._v(" "),a("p",[e._v("After sending the packet with a "),a("code",[e._v("IBCAccountPacketData")]),e._v(" which type is "),a("code",[e._v("RUNTX")]),e._v(", if the acknowledgement packet with the type "),a("code",[e._v("RUNTX")]),e._v(" and code "),a("code",[e._v("0")]),e._v(" is delivered, "),a("code",[e._v("OnTxSucceeded")]),e._v(" is executed with the counterparty chain's chain-id and virtual tx hash and requested data that is not serialized. Virtual tx hash is used only for internal logic to distinguish the requested tx and it is computed by hashing the tx bytes and sequence of packet. If else, "),a("code",[e._v("OnTxFailed")]),e._v(" will be executed.")])],1)}),[],!1,null,null,null);t.default=c.exports}}]);