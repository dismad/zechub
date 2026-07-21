<a href="https://github.com/ZecHub/zechub/new/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet Quick Reference Guide

## RPC's

To see availible rpcs, type

`zallet rpc help`

To learn about a specific rpc, type

`zallet rpc help '"<command>"'`


### RPC list

`zallet rpc decoderawtransaction '"<hexstring>"'`

`zallet rpc decodescript '"<hexstring>"'`

`zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']`

`zallet rpc getwalletinfo`

`zallet rpc getwalletstatus`

`zallet rpc listaddresses`

`zallet rpc rpc.discover`

`zallet rpc stop`

`zallet rpc validateaddress '"<address>"'`

`zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'`

`zallet rpc walletlock`

`zallet rpc walletpassphrase '"<passphrase>"' <timeout>`


`zallet rpc z_converttex '"<transparent_address>"'`

`zallet rpc z_getaccount '"<account_uuid>"'`

`zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]`

```
Param,Type,Required,Description
account,string/number,yes,Account UUID or ZIP-32 account index
receiver_types,array of string,no,Receiver types to include
diversifier_index,number,no,Specific diversifier index
```

`zallet rpc z_getbalanceforaccount <account> [<minconf>]`

`zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']`

`zallet rpc z_getnotescount [<minconf>] [<as_of_height>]`

`zallet rpc z_getoperationresult ['["opid1","opid2"]']`

`zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>] (zallet rpc z_gettotalbalance 1 true)`

`zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]`

```
Param,Type,Required,Default,Description
account,string,yes,,Account UUID
hex_data,string,yes,,Hex public key or redeem script
rescan,boolean,no,true,Rescan after import
```

`zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]`

```
Param,Type,Required,Default,Description
key,string,yes,,Sapling extended spending key
rescan,string,no,"""whenkeyisnew""","""yes"", ""no"", or ""whenkeyisnew"""
start_height,number,no,0,Rescan start height
```

`zallet rpc z_listaccounts [<include_addresses>]`

`zallet rpc z_listoperationids ['"<status>"']`

`zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]`

```
Param,Type,Required,Description
account_uuid,string,no,Limit to one account
start_height,number,no,Inclusive lower bound
end_height,number,no,Exclusive upper bound
offset,number,no,Skip this many results
limit,number,no,Maximum results to return
```

`zallet rpc z_listunifiedreceivers '"<unified_address>"'`

`zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]`

```
Param,Type,Required,Default,Description
minconf,number,no,1,Minimum confirmations
maxconf,number,no,∞,Maximum confirmations
include_watchonly,boolean,no,false,Include watch-only
addresses,array of string,no,,Filter to these addresses
as_of_height,number,no,,Query as of this height
```

`zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'`

`zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']`

```
Param,Type,Required,Default,Description
fromaddress,string,yes,,"Source address or ""ANY_TADDR"""
amounts,array of object,yes,,"Recipients (address, amount, optional memo)"
minconf,number,no,,Minimum confirmations
fee,null,no,,Must be null (ZIP-317 only)
privacy_policy,string,no,"""FullPrivacy""",Privacy policy string
```

`zallet rpc z_viewtransaction '"<txid>"'`
