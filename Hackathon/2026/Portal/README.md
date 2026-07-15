# Portal

**ZecHub Hackathon 3.0 submission — Zcash Login track.**

Live instance: [tryportal.xyz](https://tryportal.xyz)
Source repository: [github.com/IamHarrie-Labs/portal](https://github.com/IamHarrie-Labs/portal)

**Sign in with Zcash.** Portal turns a shielded Zcash transaction into a login, a paywall, and a payment link. A visitor scans a QR code with their own wallet, sends a zero value shielded memo carrying a one time code, and Portal watches it arrive on mainnet and lets them in. No email, no password, and nobody, including the site they signed into, learns who they are.

Everything here runs against the real Zcash mainnet. There is no testnet mode and nothing is simulated.

## What Portal does

**Login.** A drop in button for any website. The visitor's wallet sends a zero value shielded transaction with a one time code in the memo. Portal detects it within seconds and issues a session token. It works like Sign in with Google, except there is no Google, and no identity provider watching your logins.

**Gates.** Paywalls and memberships where the login payment is the access fee. One shielded transaction both authenticates the visitor and pays for what they unlock. Gates can settle instantly on mempool detection, or wait for a mined block for higher priced content.

**Paylinks.** Shareable payment request links. Set an amount and a label, share the URL, and get paid to a shielded address with live detection and downloadable receipts. Paylinks never expire.

**The Shielded Wall.** A live demonstration on the site. Any text after the code in a login memo becomes a public post, which means every message on the Wall traveled through Zcash mainnet inside an encrypted memo and was published without anyone knowing who wrote it.

**Creator dashboard.** Anyone can sign in with their own wallet, no signup form, and get their own receiving address, their own priced Gates, their own Paylinks, and HMAC signed webhooks, all served by one Portal instance. A creator's identity is their wallet: the reply address in the login memo, hashed, is the account key.

## How a login works

1. The site requests a challenge and shows a QR code on desktop or a tap to open wallet link on mobile. Both are a standard ZIP 321 `zcash:` URI carrying the one time code in the memo field.
2. The visitor scans or taps with any shielded Zcash wallet such as Zashi, Ywallet, or Zingo, and sends the zero value memo.
3. The Portal server, a Zcash light client watching mainnet through a public lightwalletd, sees the memo in the mempool within seconds and issues a session token.
4. Afterward the visitor can save a receipt card or open the transaction in a block explorer, where the world sees nothing at all. No sender, no receiver, no amount, no memo. That is the point.

## Architecture

```
+----------+   1. GET /auth/challenge    +--------------+
| Website  | --------------------------> |    Portal    |
| (any app | <-------------------------- |    server    |
| with SDK)|   challenge + zcash: URI QR |              |
+----------+                             |  zingo-cli   |
     ^                                   |  sidecar     |
     | 4. session JWT                    |  (light      |
     |                                   |   client)    |
+----------+   2. zero value shielded    +------+-------+
|  User's  |      memo with the code            | 3. detects memo
|  wallet  | ---------- Zcash mainnet ----------+    via lightwalletd
+----------+           (zec.rocks)               (mempool, 0-conf)
```

- **server/** is the Node.js server: challenge issuance, memo watching, JWT sessions, creator accounts, gates, paylinks, and webhooks. No database, state persists as JSON on disk.
- **sdk/** is a single dependency free JavaScript file: a `<script>` tag plus `Portal.login()` opens the QR modal and resolves with a session.
- **demo/** is the website: landing page, live products, creator dashboard, pay pages, and documentation.
- **docs/** holds the project spec and playbook.

Full source for all of the above lives in the source repository linked above rather than duplicated into this folder.

## Trust model, honestly

Portal is built on real cryptography, and the parts that are not yet trustless are stated here rather than hidden.

**Custody.** Creator receiving addresses are diversified addresses derived from the Portal instance's own wallet seed. They are unlinkable on chain, but the operator's keys can spend them, so today a creator trusts the operator to forward funds, the same way an early BTCPay style hot wallet works. The planned fix is Unified Full Viewing Keys: a creator hands Portal a viewing key for their own wallet, Portal can then see payments arrive but can never spend them, and money goes straight to the creator with no custody at all.

**Identity.** Shielded Zcash has no protocol level sender field, so a creator's identity is the reply address they include in their login memo. Portal verifies that a real shielded transaction carried the claim, but not that the sender owns the claimed address. The planned fix is a reply handshake: Portal sends an encrypted memo containing a secret back to the claimed address, and only the true owner can read it and echo it back, because a shielded memo can only be decrypted by the address owner. That proves ownership without revealing anything on chain.

**Availability.** One wallet process watches the chain for the whole instance. It is serialized and crash hardened, but a production deployment would run redundant watchers.

These tradeoffs were the right ones for version one: they made a working, end to end product possible on mainnet. The fixes above are designed and documented, not vaporware, and they are the next things to build.

## Roadmap

- Reply handshake so a claimed address becomes a proven address
- Viewing key based creator accounts, removing custody entirely
- Pay from any chain and settle in ZEC through NEAR Intents
- Automated test suite over the memo parser, challenge lifecycle, and webhook signing

## Running it yourself

Portal is two processes and no database. Build zingo-cli from [zingolib](https://github.com/zingolabs/zingolib), create a wallet, back up the seed phrase with `recovery_info`, then:

```
cd server && npm install
PORTAL_ADDRESS=u1yourshieldedaddress npm start
```

The full walkthrough, every environment variable, and the HTTP API live in the documentation served at `/docs`. A live instance is running at [tryportal.xyz](https://tryportal.xyz), with docs at [tryportal.xyz/docs](https://tryportal.xyz/docs).

## License

MIT
