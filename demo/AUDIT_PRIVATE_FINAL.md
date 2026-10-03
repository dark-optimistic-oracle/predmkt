# Verity Prediction Market Aleo call log

Generated: 2026-10-03T14:03:54.137Z.

> Generated automatically from the browser audit journal. Private Aleo record plaintext is redacted before persistence.

## 1. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T02:57:21.051Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T02:57:21.051Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  }
}
```

## 2. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T02:57:21.051Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T02:57:21.051Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  }
}
```

## 3. Read deployed program doo_prediction_market.aleo

**What happened:** The frontend requested: Read deployed program doo_prediction_market.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T02:57:21.051Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `doo_prediction_market.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T02:57:21.051Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program doo_prediction_market.aleo",
  "program": "doo_prediction_market.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "doo_prediction_market.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"
  }
}
```

## 4. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T02:57:21.329Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T02:57:21.329Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 5. Read deployed program doo_prediction_market.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T02:57:21.349Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `doo_prediction_market.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T02:57:21.349Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program doo_prediction_market.aleo",
  "program": "doo_prediction_market.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "doo_prediction_market.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 6. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T02:57:21.349Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T02:57:21.349Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 7. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T02:58:52.806Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T02:58:52.806Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  }
}
```

## 8. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T02:58:52.807Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T02:58:52.807Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  }
}
```

## 9. Read deployed program doo_prediction_market.aleo

**What happened:** The frontend requested: Read deployed program doo_prediction_market.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T02:58:52.807Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `doo_prediction_market.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T02:58:52.807Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program doo_prediction_market.aleo",
  "program": "doo_prediction_market.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "doo_prediction_market.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"
  }
}
```

## 10. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T02:58:52.902Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T02:58:52.902Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 11. Read deployed program doo_prediction_market.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T02:58:52.905Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `doo_prediction_market.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T02:58:52.905Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program doo_prediction_market.aleo",
  "program": "doo_prediction_market.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "doo_prediction_market.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 12. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T02:58:52.990Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T02:58:52.990Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 13. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T03:08:39.311Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T03:08:39.311Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  }
}
```

## 14. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T03:08:39.312Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T03:08:39.312Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  }
}
```

## 15. Read deployed program doo_prediction_market.aleo

**What happened:** The frontend requested: Read deployed program doo_prediction_market.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T03:08:39.312Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `doo_prediction_market.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T03:08:39.312Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program doo_prediction_market.aleo",
  "program": "doo_prediction_market.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "doo_prediction_market.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"
  }
}
```

## 16. Read deployed program doo_prediction_market.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T03:08:39.451Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `doo_prediction_market.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T03:08:39.451Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program doo_prediction_market.aleo",
  "program": "doo_prediction_market.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "doo_prediction_market.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 17. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T03:08:39.466Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T03:08:39.466Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 18. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T03:08:39.490Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T03:08:39.490Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 19. Read doo_prediction_market.aleo.markets[187031921field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.markets[187031921field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T03:08:45.369Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 7,
  "timestamp": "2026-10-03T03:08:45.369Z",
  "callId": "aleo-call-4",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[187031921field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "187031921field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/187031921field"
  }
}
```

## 20. Read doo_prediction_market.aleo.collateral_pool[187031921field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.collateral_pool[187031921field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T03:08:45.370Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 8,
  "timestamp": "2026-10-03T03:08:45.370Z",
  "callId": "aleo-call-5",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[187031921field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "187031921field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/187031921field"
  }
}
```

## 21. Read doo_prediction_market.aleo.yes_supply[187031921field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.yes_supply[187031921field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T03:08:45.371Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 9,
  "timestamp": "2026-10-03T03:08:45.371Z",
  "callId": "aleo-call-6",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[187031921field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "187031921field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/187031921field"
  }
}
```

## 22. Read doo_prediction_market.aleo.no_supply[187031921field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.no_supply[187031921field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T03:08:45.371Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 10,
  "timestamp": "2026-10-03T03:08:45.371Z",
  "callId": "aleo-call-7",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[187031921field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "187031921field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/187031921field"
  }
}
```

## 23. Read doo_prediction_market.aleo.resolved[187031921field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolved[187031921field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T03:08:45.371Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 11,
  "timestamp": "2026-10-03T03:08:45.371Z",
  "callId": "aleo-call-8",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[187031921field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "187031921field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/187031921field"
  }
}
```

## 24. Read doo_prediction_market.aleo.resolutions[187031921field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolutions[187031921field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T03:08:45.371Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 12,
  "timestamp": "2026-10-03T03:08:45.371Z",
  "callId": "aleo-call-9",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[187031921field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "187031921field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/187031921field"
  }
}
```

## 25. Read dark_optimistic_oracle.aleo.assertions[187031922field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[187031922field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T03:08:45.371Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 13,
  "timestamp": "2026-10-03T03:08:45.371Z",
  "callId": "aleo-call-10",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[187031922field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "187031922field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/187031922field"
  }
}
```

## 26. Read dark_optimistic_oracle.aleo.disputers[187031922field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[187031922field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T03:08:45.372Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 14,
  "timestamp": "2026-10-03T03:08:45.372Z",
  "callId": "aleo-call-11",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[187031922field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "187031922field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/187031922field"
  }
}
```

## 27. Read doo_prediction_market.aleo.yes_supply[187031921field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T03:08:45.474Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 15,
  "timestamp": "2026-10-03T03:08:45.474Z",
  "callId": "aleo-call-6",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[187031921field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "187031921field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/187031921field"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 28. Read doo_prediction_market.aleo.markets[187031921field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T03:08:45.485Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 16,
  "timestamp": "2026-10-03T03:08:45.485Z",
  "callId": "aleo-call-4",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[187031921field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "187031921field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/187031921field"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 29. Read dark_optimistic_oracle.aleo.assertions[187031922field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T03:08:45.486Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 17,
  "timestamp": "2026-10-03T03:08:45.486Z",
  "callId": "aleo-call-10",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[187031922field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "187031922field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/187031922field"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 30. Read doo_prediction_market.aleo.collateral_pool[187031921field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T03:08:45.489Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 18,
  "timestamp": "2026-10-03T03:08:45.489Z",
  "callId": "aleo-call-5",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[187031921field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "187031921field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/187031921field"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 31. Read doo_prediction_market.aleo.resolutions[187031921field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T03:08:45.489Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 19,
  "timestamp": "2026-10-03T03:08:45.489Z",
  "callId": "aleo-call-9",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[187031921field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "187031921field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/187031921field"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 32. Read doo_prediction_market.aleo.no_supply[187031921field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T03:08:45.494Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 20,
  "timestamp": "2026-10-03T03:08:45.494Z",
  "callId": "aleo-call-7",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[187031921field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "187031921field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/187031921field"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 33. Read dark_optimistic_oracle.aleo.disputers[187031922field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T03:08:45.506Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 21,
  "timestamp": "2026-10-03T03:08:45.506Z",
  "callId": "aleo-call-11",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[187031922field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "187031922field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/187031922field"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 34. Read doo_prediction_market.aleo.resolved[187031921field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T03:08:45.521Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 22,
  "timestamp": "2026-10-03T03:08:45.521Z",
  "callId": "aleo-call-8",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[187031921field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "187031921field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/187031921field"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 35. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:07.730Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T05:43:07.730Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  }
}
```

## 36. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:07.731Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T05:43:07.731Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  }
}
```

## 37. Read deployed program doo_prediction_market.aleo

**What happened:** The frontend requested: Read deployed program doo_prediction_market.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:07.731Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `doo_prediction_market.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T05:43:07.731Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program doo_prediction_market.aleo",
  "program": "doo_prediction_market.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "doo_prediction_market.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"
  }
}
```

## 38. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:07.826Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T05:43:07.826Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 39. Read deployed program doo_prediction_market.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:07.844Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `doo_prediction_market.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T05:43:07.844Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program doo_prediction_market.aleo",
  "program": "doo_prediction_market.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "doo_prediction_market.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 40. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:07.860Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T05:43:07.860Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 41. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:40.971Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T05:43:40.971Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-01"
  }
}
```

## 42. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:40.971Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T05:43:40.971Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-01"
  }
}
```

## 43. Read deployed program doo_prediction_market.aleo

**What happened:** The frontend requested: Read deployed program doo_prediction_market.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:40.971Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `doo_prediction_market.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T05:43:40.971Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program doo_prediction_market.aleo",
  "program": "doo_prediction_market.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "doo_prediction_market.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-01"
  }
}
```

## 44. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:41.074Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T05:43:41.074Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 45. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:41.082Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T05:43:41.082Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 46. Read deployed program doo_prediction_market.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:41.083Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `doo_prediction_market.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T05:43:41.083Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program doo_prediction_market.aleo",
  "program": "doo_prediction_market.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "doo_prediction_market.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 47. Read doo_prediction_market.aleo.markets[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.markets[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:46.398Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 7,
  "timestamp": "2026-10-03T05:43:46.398Z",
  "callId": "aleo-call-4",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  }
}
```

## 48. Read doo_prediction_market.aleo.collateral_pool[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.collateral_pool[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:46.399Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 8,
  "timestamp": "2026-10-03T05:43:46.399Z",
  "callId": "aleo-call-5",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  }
}
```

## 49. Read doo_prediction_market.aleo.yes_supply[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.yes_supply[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:46.400Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 9,
  "timestamp": "2026-10-03T05:43:46.400Z",
  "callId": "aleo-call-6",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  }
}
```

## 50. Read doo_prediction_market.aleo.no_supply[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.no_supply[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:46.400Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 10,
  "timestamp": "2026-10-03T05:43:46.400Z",
  "callId": "aleo-call-7",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  }
}
```

## 51. Read doo_prediction_market.aleo.resolved[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolved[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:46.400Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 11,
  "timestamp": "2026-10-03T05:43:46.400Z",
  "callId": "aleo-call-8",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  }
}
```

## 52. Read doo_prediction_market.aleo.resolutions[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolutions[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:46.400Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 12,
  "timestamp": "2026-10-03T05:43:46.400Z",
  "callId": "aleo-call-9",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  }
}
```

## 53. Read dark_optimistic_oracle.aleo.assertions[2026100304field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100304field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:46.401Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 13,
  "timestamp": "2026-10-03T05:43:46.401Z",
  "callId": "aleo-call-10",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  }
}
```

## 54. Read dark_optimistic_oracle.aleo.disputers[2026100304field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100304field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:43:46.401Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 14,
  "timestamp": "2026-10-03T05:43:46.401Z",
  "callId": "aleo-call-11",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  }
}
```

## 55. Read doo_prediction_market.aleo.markets[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:46.501Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 15,
  "timestamp": "2026-10-03T05:43:46.501Z",
  "callId": "aleo-call-4",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 56. Read doo_prediction_market.aleo.resolved[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:46.503Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 16,
  "timestamp": "2026-10-03T05:43:46.503Z",
  "callId": "aleo-call-8",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 57. Read doo_prediction_market.aleo.no_supply[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:46.504Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 17,
  "timestamp": "2026-10-03T05:43:46.504Z",
  "callId": "aleo-call-7",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 58. Read dark_optimistic_oracle.aleo.assertions[2026100304field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:46.504Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 18,
  "timestamp": "2026-10-03T05:43:46.504Z",
  "callId": "aleo-call-10",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 59. Read doo_prediction_market.aleo.resolutions[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:46.512Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 19,
  "timestamp": "2026-10-03T05:43:46.512Z",
  "callId": "aleo-call-9",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 60. Read doo_prediction_market.aleo.collateral_pool[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:46.515Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 20,
  "timestamp": "2026-10-03T05:43:46.515Z",
  "callId": "aleo-call-5",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 61. Read dark_optimistic_oracle.aleo.disputers[2026100304field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:46.519Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 21,
  "timestamp": "2026-10-03T05:43:46.519Z",
  "callId": "aleo-call-11",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 62. Read doo_prediction_market.aleo.yes_supply[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:43:46.531Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 22,
  "timestamp": "2026-10-03T05:43:46.531Z",
  "callId": "aleo-call-6",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 63. Submit doo_prediction_market.aleo.create_market

**What happened:** The frontend prepared doo_prediction_market.aleo.create_market and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T05:43:56.631Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-12`
- Program: `doo_prediction_market.aleo`
- Function: `create_market`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-04`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 23,
  "timestamp": "2026-10-03T05:43:56.631Z",
  "callId": "aleo-call-12",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.create_market",
  "program": "doo_prediction_market.aleo",
  "function": "create_market",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market",
        "value": "{\n        id: 202610031field,\n        question_hash: 3481789625393402739888395340240929917743009203549756830888972568957464392455field,\n        yes_claim_hash: 4204338562457074975679592853958942804323265852425148722077598929334955251420field,\n        no_claim_hash: 2967417042158376102450225601938321003547211130752879883823781015207720436798field,\n        assertion_id: 2026100304field,\n        yes_token_id: 47542102130958773753794360442534411634158207078581067571747032812316018272field,\n        no_token_id: 6207808296571808278410508335905718647193302544372670956367431273532282847822field,\n        yes_token_name: 27627974637881300243136394033u128,\n        no_token_name: 94670206692189310622380849u128,\n        yes_token_symbol: 27627974637881300243136394033u128,\n        no_token_symbol: 94670206692189310622380849u128,\n        betting_deadline_block_height: 20136440u32\n      }"
      },
      {
        "position": 1,
        "name": "initial_liquidity",
        "value": "10000u64"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-04"
  }
}
```

## 64. Submit doo_prediction_market.aleo.create_market

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T05:44:16.116Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-12`
- Program: `doo_prediction_market.aleo`
- Function: `create_market`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-04`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 24,
  "timestamp": "2026-10-03T05:44:16.116Z",
  "callId": "aleo-call-12",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.create_market",
  "program": "doo_prediction_market.aleo",
  "function": "create_market",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market",
        "value": "{\n        id: 202610031field,\n        question_hash: 3481789625393402739888395340240929917743009203549756830888972568957464392455field,\n        yes_claim_hash: 4204338562457074975679592853958942804323265852425148722077598929334955251420field,\n        no_claim_hash: 2967417042158376102450225601938321003547211130752879883823781015207720436798field,\n        assertion_id: 2026100304field,\n        yes_token_id: 47542102130958773753794360442534411634158207078581067571747032812316018272field,\n        no_token_id: 6207808296571808278410508335905718647193302544372670956367431273532282847822field,\n        yes_token_name: 27627974637881300243136394033u128,\n        no_token_name: 94670206692189310622380849u128,\n        yes_token_symbol: 27627974637881300243136394033u128,\n        no_token_symbol: 94670206692189310622380849u128,\n        betting_deadline_block_height: 20136440u32\n      }"
      },
      {
        "position": 1,
        "name": "initial_liquidity",
        "value": "10000u64"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-04"
  },
  "result": {
    "walletRequestId": "shield_1791006256110_by9dpchdnd"
  }
}
```

## 65. Submit doo_prediction_market.aleo.create_market

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1etkdf8ak0m0mst4tgrepr4ka6ctq9gx70a7dkghyp8ruqat8z5fq9637my.

- Time: 2026-10-03T05:44:40.188Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-12`
- Program: `doo_prediction_market.aleo`
- Function: `create_market`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-04`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 25,
  "timestamp": "2026-10-03T05:44:40.188Z",
  "callId": "aleo-call-12",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.create_market",
  "program": "doo_prediction_market.aleo",
  "function": "create_market",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market",
        "value": "{\n        id: 202610031field,\n        question_hash: 3481789625393402739888395340240929917743009203549756830888972568957464392455field,\n        yes_claim_hash: 4204338562457074975679592853958942804323265852425148722077598929334955251420field,\n        no_claim_hash: 2967417042158376102450225601938321003547211130752879883823781015207720436798field,\n        assertion_id: 2026100304field,\n        yes_token_id: 47542102130958773753794360442534411634158207078581067571747032812316018272field,\n        no_token_id: 6207808296571808278410508335905718647193302544372670956367431273532282847822field,\n        yes_token_name: 27627974637881300243136394033u128,\n        no_token_name: 94670206692189310622380849u128,\n        yes_token_symbol: 27627974637881300243136394033u128,\n        no_token_symbol: 94670206692189310622380849u128,\n        betting_deadline_block_height: 20136440u32\n      }"
      },
      {
        "position": 1,
        "name": "initial_liquidity",
        "value": "10000u64"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-04"
  },
  "result": {
    "walletRequestId": "shield_1791006256110_by9dpchdnd",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1etkdf8ak0m0mst4tgrepr4ka6ctq9gx70a7dkghyp8ruqat8z5fq9637my",
    "statusPollAttempts": 13,
    "timedOut": false,
    "walletError": null
  }
}
```

## 66. Submit doo_prediction_market.aleo.buy_outcome

**What happened:** The frontend prepared doo_prediction_market.aleo.buy_outcome and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T05:45:00.586Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-13`
- Program: `doo_prediction_market.aleo`
- Function: `buy_outcome`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-05`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 26,
  "timestamp": "2026-10-03T05:45:00.586Z",
  "callId": "aleo-call-13",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.buy_outcome",
  "program": "doo_prediction_market.aleo",
  "function": "buy_outcome",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market_id",
        "value": "202610031field"
      },
      {
        "position": 1,
        "name": "outcome",
        "value": "true"
      },
      {
        "position": 2,
        "name": "outcome_token_id",
        "value": "47542102130958773753794360442534411634158207078581067571747032812316018272field"
      },
      {
        "position": 3,
        "name": "amount",
        "value": "20000u64"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-05"
  }
}
```

## 67. Submit doo_prediction_market.aleo.buy_outcome

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T05:45:10.089Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-13`
- Program: `doo_prediction_market.aleo`
- Function: `buy_outcome`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-05`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 27,
  "timestamp": "2026-10-03T05:45:10.089Z",
  "callId": "aleo-call-13",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.buy_outcome",
  "program": "doo_prediction_market.aleo",
  "function": "buy_outcome",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market_id",
        "value": "202610031field"
      },
      {
        "position": 1,
        "name": "outcome",
        "value": "true"
      },
      {
        "position": 2,
        "name": "outcome_token_id",
        "value": "47542102130958773753794360442534411634158207078581067571747032812316018272field"
      },
      {
        "position": 3,
        "name": "amount",
        "value": "20000u64"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-05"
  },
  "result": {
    "walletRequestId": "shield_1791006310084_h45pa7nmkjn"
  }
}
```

## 68. Submit doo_prediction_market.aleo.buy_outcome

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1ngwzavtnaw967kq5j6s6xm5j4eq8v85rfs3vdkzfcrzw76jt0ypqyl9kzj.

- Time: 2026-10-03T05:45:30.336Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-13`
- Program: `doo_prediction_market.aleo`
- Function: `buy_outcome`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-05`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 28,
  "timestamp": "2026-10-03T05:45:30.336Z",
  "callId": "aleo-call-13",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.buy_outcome",
  "program": "doo_prediction_market.aleo",
  "function": "buy_outcome",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market_id",
        "value": "202610031field"
      },
      {
        "position": 1,
        "name": "outcome",
        "value": "true"
      },
      {
        "position": 2,
        "name": "outcome_token_id",
        "value": "47542102130958773753794360442534411634158207078581067571747032812316018272field"
      },
      {
        "position": 3,
        "name": "amount",
        "value": "20000u64"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-05"
  },
  "result": {
    "walletRequestId": "shield_1791006310084_h45pa7nmkjn",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1ngwzavtnaw967kq5j6s6xm5j4eq8v85rfs3vdkzfcrzw76jt0ypqyl9kzj",
    "statusPollAttempts": 11,
    "timedOut": false,
    "walletError": null
  }
}
```

## 69. Submit doo_prediction_market.aleo.buy_outcome

**What happened:** The frontend prepared doo_prediction_market.aleo.buy_outcome and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T05:45:39.964Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-14`
- Program: `doo_prediction_market.aleo`
- Function: `buy_outcome`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 29,
  "timestamp": "2026-10-03T05:45:39.964Z",
  "callId": "aleo-call-14",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.buy_outcome",
  "program": "doo_prediction_market.aleo",
  "function": "buy_outcome",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market_id",
        "value": "202610031field"
      },
      {
        "position": 1,
        "name": "outcome",
        "value": "false"
      },
      {
        "position": 2,
        "name": "outcome_token_id",
        "value": "6207808296571808278410508335905718647193302544372670956367431273532282847822field"
      },
      {
        "position": 3,
        "name": "amount",
        "value": "10000u64"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

## 70. Submit doo_prediction_market.aleo.buy_outcome

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T05:45:52.077Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-14`
- Program: `doo_prediction_market.aleo`
- Function: `buy_outcome`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 30,
  "timestamp": "2026-10-03T05:45:52.077Z",
  "callId": "aleo-call-14",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.buy_outcome",
  "program": "doo_prediction_market.aleo",
  "function": "buy_outcome",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market_id",
        "value": "202610031field"
      },
      {
        "position": 1,
        "name": "outcome",
        "value": "false"
      },
      {
        "position": 2,
        "name": "outcome_token_id",
        "value": "6207808296571808278410508335905718647193302544372670956367431273532282847822field"
      },
      {
        "position": 3,
        "name": "amount",
        "value": "10000u64"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "walletRequestId": "shield_1791006352074_dj2p4ulf1c"
  }
}
```

## 71. Submit doo_prediction_market.aleo.buy_outcome

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1nea9t05gq4fruz3tl5cr44xfpzu7g0am89tfd4uyguts4ytv7vps6cg7d7.

- Time: 2026-10-03T05:45:58.090Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-14`
- Program: `doo_prediction_market.aleo`
- Function: `buy_outcome`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 31,
  "timestamp": "2026-10-03T05:45:58.090Z",
  "callId": "aleo-call-14",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.buy_outcome",
  "program": "doo_prediction_market.aleo",
  "function": "buy_outcome",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market_id",
        "value": "202610031field"
      },
      {
        "position": 1,
        "name": "outcome",
        "value": "false"
      },
      {
        "position": 2,
        "name": "outcome_token_id",
        "value": "6207808296571808278410508335905718647193302544372670956367431273532282847822field"
      },
      {
        "position": 3,
        "name": "amount",
        "value": "10000u64"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "walletRequestId": "shield_1791006352074_dj2p4ulf1c",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1nea9t05gq4fruz3tl5cr44xfpzu7g0am89tfd4uyguts4ytv7vps6cg7d7",
    "statusPollAttempts": 4,
    "timedOut": false,
    "walletError": null
  }
}
```

## 72. Read doo_prediction_market.aleo.markets[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.markets[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:45:58.778Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-15`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 32,
  "timestamp": "2026-10-03T05:45:58.778Z",
  "callId": "aleo-call-15",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

## 73. Read doo_prediction_market.aleo.collateral_pool[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.collateral_pool[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:45:58.779Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-16`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 33,
  "timestamp": "2026-10-03T05:45:58.779Z",
  "callId": "aleo-call-16",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

## 74. Read doo_prediction_market.aleo.yes_supply[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.yes_supply[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:45:58.779Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-17`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 34,
  "timestamp": "2026-10-03T05:45:58.779Z",
  "callId": "aleo-call-17",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

## 75. Read doo_prediction_market.aleo.no_supply[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.no_supply[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:45:58.779Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-18`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 35,
  "timestamp": "2026-10-03T05:45:58.779Z",
  "callId": "aleo-call-18",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

## 76. Read doo_prediction_market.aleo.resolved[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolved[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:45:58.780Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-19`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 36,
  "timestamp": "2026-10-03T05:45:58.780Z",
  "callId": "aleo-call-19",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

## 77. Read doo_prediction_market.aleo.resolutions[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolutions[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:45:58.780Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-20`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 37,
  "timestamp": "2026-10-03T05:45:58.780Z",
  "callId": "aleo-call-20",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

## 78. Read dark_optimistic_oracle.aleo.assertions[2026100304field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100304field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:45:58.780Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-21`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 38,
  "timestamp": "2026-10-03T05:45:58.780Z",
  "callId": "aleo-call-21",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

## 79. Read dark_optimistic_oracle.aleo.disputers[2026100304field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100304field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:45:58.780Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-22`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 39,
  "timestamp": "2026-10-03T05:45:58.780Z",
  "callId": "aleo-call-22",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

## 80. Read doo_prediction_market.aleo.markets[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:45:58.881Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-15`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 40,
  "timestamp": "2026-10-03T05:45:58.881Z",
  "callId": "aleo-call-15",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 81. Read doo_prediction_market.aleo.no_supply[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:45:58.883Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-18`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 41,
  "timestamp": "2026-10-03T05:45:58.883Z",
  "callId": "aleo-call-18",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 82. Read doo_prediction_market.aleo.yes_supply[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:45:58.883Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-17`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 42,
  "timestamp": "2026-10-03T05:45:58.883Z",
  "callId": "aleo-call-17",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 83. Read doo_prediction_market.aleo.resolved[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:45:58.885Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-19`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 43,
  "timestamp": "2026-10-03T05:45:58.885Z",
  "callId": "aleo-call-19",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 84. Read dark_optimistic_oracle.aleo.assertions[2026100304field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:45:58.891Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-21`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 44,
  "timestamp": "2026-10-03T05:45:58.891Z",
  "callId": "aleo-call-21",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 85. Read doo_prediction_market.aleo.collateral_pool[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:45:58.895Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-16`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 45,
  "timestamp": "2026-10-03T05:45:58.895Z",
  "callId": "aleo-call-16",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 86. Read dark_optimistic_oracle.aleo.disputers[2026100304field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:45:58.895Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-22`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 46,
  "timestamp": "2026-10-03T05:45:58.895Z",
  "callId": "aleo-call-22",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 87. Read doo_prediction_market.aleo.resolutions[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:45:58.902Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-20`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 47,
  "timestamp": "2026-10-03T05:45:58.902Z",
  "callId": "aleo-call-20",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 88. Read doo_prediction_market.aleo.markets[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.markets[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:46:18.531Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-23`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 48,
  "timestamp": "2026-10-03T05:46:18.531Z",
  "callId": "aleo-call-23",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

## 89. Read doo_prediction_market.aleo.collateral_pool[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.collateral_pool[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:46:18.532Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-24`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 49,
  "timestamp": "2026-10-03T05:46:18.532Z",
  "callId": "aleo-call-24",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

## 90. Read doo_prediction_market.aleo.yes_supply[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.yes_supply[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:46:18.533Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-25`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 50,
  "timestamp": "2026-10-03T05:46:18.533Z",
  "callId": "aleo-call-25",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

## 91. Read doo_prediction_market.aleo.no_supply[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.no_supply[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:46:18.533Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-26`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 51,
  "timestamp": "2026-10-03T05:46:18.533Z",
  "callId": "aleo-call-26",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

## 92. Read doo_prediction_market.aleo.resolved[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolved[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:46:18.534Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-27`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 52,
  "timestamp": "2026-10-03T05:46:18.534Z",
  "callId": "aleo-call-27",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

## 93. Read doo_prediction_market.aleo.resolutions[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolutions[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:46:18.535Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-28`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 53,
  "timestamp": "2026-10-03T05:46:18.535Z",
  "callId": "aleo-call-28",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

## 94. Read dark_optimistic_oracle.aleo.assertions[2026100304field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100304field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:46:18.536Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-29`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 54,
  "timestamp": "2026-10-03T05:46:18.536Z",
  "callId": "aleo-call-29",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

## 95. Read dark_optimistic_oracle.aleo.disputers[2026100304field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100304field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:46:18.537Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-30`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 55,
  "timestamp": "2026-10-03T05:46:18.537Z",
  "callId": "aleo-call-30",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  }
}
```

## 96. Read doo_prediction_market.aleo.markets[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:46:18.635Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-23`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 56,
  "timestamp": "2026-10-03T05:46:18.635Z",
  "callId": "aleo-call-23",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 97. Read doo_prediction_market.aleo.resolved[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:46:18.642Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-27`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 57,
  "timestamp": "2026-10-03T05:46:18.642Z",
  "callId": "aleo-call-27",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 98. Read doo_prediction_market.aleo.yes_supply[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:46:18.645Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-25`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 58,
  "timestamp": "2026-10-03T05:46:18.645Z",
  "callId": "aleo-call-25",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 99. Read dark_optimistic_oracle.aleo.assertions[2026100304field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:46:18.657Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-29`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 59,
  "timestamp": "2026-10-03T05:46:18.657Z",
  "callId": "aleo-call-29",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 100. Read doo_prediction_market.aleo.no_supply[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:46:18.659Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-26`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 60,
  "timestamp": "2026-10-03T05:46:18.659Z",
  "callId": "aleo-call-26",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 101. Read dark_optimistic_oracle.aleo.disputers[2026100304field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:46:18.660Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-30`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 61,
  "timestamp": "2026-10-03T05:46:18.660Z",
  "callId": "aleo-call-30",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 102. Read doo_prediction_market.aleo.resolutions[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:46:18.662Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-28`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 62,
  "timestamp": "2026-10-03T05:46:18.662Z",
  "callId": "aleo-call-28",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 103. Read doo_prediction_market.aleo.collateral_pool[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:46:18.677Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-24`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 63,
  "timestamp": "2026-10-03T05:46:18.677Z",
  "callId": "aleo-call-24",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 104. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.create_assertion and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T05:47:06.771Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-31`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-07`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 64,
  "timestamp": "2026-10-03T05:47:06.771Z",
  "callId": "aleo-call-31",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100304field,\n        title: 202610031field,\n        content_hash: 4204338562457074975679592853958942804323265852425148722077598929334955251420field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20136480u32,\n        voting_deadline_block_height: 20136520u32\n      }"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-07"
  }
}
```

## 105. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T05:47:19.601Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-31`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-07`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 65,
  "timestamp": "2026-10-03T05:47:19.601Z",
  "callId": "aleo-call-31",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100304field,\n        title: 202610031field,\n        content_hash: 4204338562457074975679592853958942804323265852425148722077598929334955251420field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20136480u32,\n        voting_deadline_block_height: 20136520u32\n      }"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-07"
  },
  "result": {
    "walletRequestId": "shield_1791006439599_6s138o4nif5"
  }
}
```

## 106. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1rdmdxp6mthz33r08st5paptejxhq08h05mty37pw8y08chncuyxsendv0r.

- Time: 2026-10-03T05:47:25.619Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-31`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-07`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 66,
  "timestamp": "2026-10-03T05:47:25.619Z",
  "callId": "aleo-call-31",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100304field,\n        title: 202610031field,\n        content_hash: 4204338562457074975679592853958942804323265852425148722077598929334955251420field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20136480u32,\n        voting_deadline_block_height: 20136520u32\n      }"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-07"
  },
  "result": {
    "walletRequestId": "shield_1791006439599_6s138o4nif5",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1rdmdxp6mthz33r08st5paptejxhq08h05mty37pw8y08chncuyxsendv0r",
    "statusPollAttempts": 4,
    "timedOut": false,
    "walletError": null
  }
}
```

## 107. Read doo_prediction_market.aleo.markets[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.markets[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:48:40.388Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-32`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 67,
  "timestamp": "2026-10-03T05:48:40.388Z",
  "callId": "aleo-call-32",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  }
}
```

## 108. Read doo_prediction_market.aleo.collateral_pool[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.collateral_pool[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:48:40.389Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-33`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 68,
  "timestamp": "2026-10-03T05:48:40.389Z",
  "callId": "aleo-call-33",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  }
}
```

## 109. Read doo_prediction_market.aleo.yes_supply[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.yes_supply[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:48:40.390Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-34`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 69,
  "timestamp": "2026-10-03T05:48:40.390Z",
  "callId": "aleo-call-34",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  }
}
```

## 110. Read doo_prediction_market.aleo.no_supply[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.no_supply[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:48:40.391Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-35`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 70,
  "timestamp": "2026-10-03T05:48:40.391Z",
  "callId": "aleo-call-35",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  }
}
```

## 111. Read doo_prediction_market.aleo.resolved[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolved[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:48:40.392Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-36`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 71,
  "timestamp": "2026-10-03T05:48:40.392Z",
  "callId": "aleo-call-36",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  }
}
```

## 112. Read doo_prediction_market.aleo.resolutions[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolutions[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:48:40.392Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-37`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 72,
  "timestamp": "2026-10-03T05:48:40.392Z",
  "callId": "aleo-call-37",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  }
}
```

## 113. Read dark_optimistic_oracle.aleo.assertions[2026100304field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100304field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:48:40.393Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-38`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 73,
  "timestamp": "2026-10-03T05:48:40.393Z",
  "callId": "aleo-call-38",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  }
}
```

## 114. Read dark_optimistic_oracle.aleo.disputers[2026100304field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100304field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:48:40.393Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-39`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 74,
  "timestamp": "2026-10-03T05:48:40.393Z",
  "callId": "aleo-call-39",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  }
}
```

## 115. Read dark_optimistic_oracle.aleo.disputers[2026100304field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:48:40.500Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-39`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 75,
  "timestamp": "2026-10-03T05:48:40.500Z",
  "callId": "aleo-call-39",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 116. Read doo_prediction_market.aleo.no_supply[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:48:40.504Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-35`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 76,
  "timestamp": "2026-10-03T05:48:40.504Z",
  "callId": "aleo-call-35",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 117. Read doo_prediction_market.aleo.resolutions[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:48:40.511Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-37`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 77,
  "timestamp": "2026-10-03T05:48:40.511Z",
  "callId": "aleo-call-37",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 118. Read doo_prediction_market.aleo.markets[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:48:40.511Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-32`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 78,
  "timestamp": "2026-10-03T05:48:40.511Z",
  "callId": "aleo-call-32",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 119. Read dark_optimistic_oracle.aleo.assertions[2026100304field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:48:40.514Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-38`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 79,
  "timestamp": "2026-10-03T05:48:40.514Z",
  "callId": "aleo-call-38",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 120. Read doo_prediction_market.aleo.collateral_pool[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:48:40.514Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-33`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 80,
  "timestamp": "2026-10-03T05:48:40.514Z",
  "callId": "aleo-call-33",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 121. Read doo_prediction_market.aleo.resolved[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:48:40.522Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-36`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 81,
  "timestamp": "2026-10-03T05:48:40.522Z",
  "callId": "aleo-call-36",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 122. Read doo_prediction_market.aleo.yes_supply[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:48:40.525Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-34`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 82,
  "timestamp": "2026-10-03T05:48:40.525Z",
  "callId": "aleo-call-34",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-08"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 123. Submit doo_prediction_market.aleo.settle_market

**What happened:** The frontend prepared doo_prediction_market.aleo.settle_market and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T05:49:24.087Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-40`
- Program: `doo_prediction_market.aleo`
- Function: `settle_market`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 83,
  "timestamp": "2026-10-03T05:49:24.087Z",
  "callId": "aleo-call-40",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.settle_market",
  "program": "doo_prediction_market.aleo",
  "function": "settle_market",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market_id",
        "value": "202610031field"
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100304field"
      },
      {
        "position": 2,
        "name": "reported_outcome",
        "value": "true"
      },
      {
        "position": 3,
        "name": "reported_claim_hash",
        "value": "4204338562457074975679592853958942804323265852425148722077598929334955251420field"
      },
      {
        "position": 4,
        "name": "assertion_valid",
        "value": "true"
      },
      {
        "position": 5,
        "name": "betting_deadline_block_height",
        "value": "20136440u32"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-09"
  }
}
```

## 124. Submit doo_prediction_market.aleo.settle_market

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T05:49:43.527Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-40`
- Program: `doo_prediction_market.aleo`
- Function: `settle_market`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 84,
  "timestamp": "2026-10-03T05:49:43.527Z",
  "callId": "aleo-call-40",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.settle_market",
  "program": "doo_prediction_market.aleo",
  "function": "settle_market",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market_id",
        "value": "202610031field"
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100304field"
      },
      {
        "position": 2,
        "name": "reported_outcome",
        "value": "true"
      },
      {
        "position": 3,
        "name": "reported_claim_hash",
        "value": "4204338562457074975679592853958942804323265852425148722077598929334955251420field"
      },
      {
        "position": 4,
        "name": "assertion_valid",
        "value": "true"
      },
      {
        "position": 5,
        "name": "betting_deadline_block_height",
        "value": "20136440u32"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-09"
  },
  "result": {
    "walletRequestId": "shield_1791006583525_j96g4al49m"
  }
}
```

## 125. Submit doo_prediction_market.aleo.settle_market

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at12kys8n07pd95nj6ezwnwghdzmkpv8gtz69ryuwyk6qs2ncqgtsqqfns8v8.

- Time: 2026-10-03T05:49:57.565Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-40`
- Program: `doo_prediction_market.aleo`
- Function: `settle_market`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 85,
  "timestamp": "2026-10-03T05:49:57.565Z",
  "callId": "aleo-call-40",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.settle_market",
  "program": "doo_prediction_market.aleo",
  "function": "settle_market",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market_id",
        "value": "202610031field"
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100304field"
      },
      {
        "position": 2,
        "name": "reported_outcome",
        "value": "true"
      },
      {
        "position": 3,
        "name": "reported_claim_hash",
        "value": "4204338562457074975679592853958942804323265852425148722077598929334955251420field"
      },
      {
        "position": 4,
        "name": "assertion_valid",
        "value": "true"
      },
      {
        "position": 5,
        "name": "betting_deadline_block_height",
        "value": "20136440u32"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-09"
  },
  "result": {
    "walletRequestId": "shield_1791006583525_j96g4al49m",
    "walletStatus": "accepted",
    "onchainTransactionId": "at12kys8n07pd95nj6ezwnwghdzmkpv8gtz69ryuwyk6qs2ncqgtsqqfns8v8",
    "statusPollAttempts": 8,
    "timedOut": false,
    "walletError": null
  }
}
```

## 126. Submit doo_prediction_market.aleo.redeem_winning_tokens

**What happened:** The frontend prepared doo_prediction_market.aleo.redeem_winning_tokens and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T05:50:24.005Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-41`
- Program: `doo_prediction_market.aleo`
- Function: `redeem_winning_tokens`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-10`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 86,
  "timestamp": "2026-10-03T05:50:24.005Z",
  "callId": "aleo-call-41",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.redeem_winning_tokens",
  "program": "doo_prediction_market.aleo",
  "function": "redeem_winning_tokens",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market_id",
        "value": "202610031field"
      },
      {
        "position": 1,
        "name": "outcome_token_id",
        "value": "47542102130958773753794360442534411634158207078581067571747032812316018272field"
      },
      {
        "position": 2,
        "name": "amount",
        "value": "30000u128"
      },
      {
        "position": 3,
        "name": "payout_microcredits",
        "value": "50000u64"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-10"
  }
}
```

## 127. Submit doo_prediction_market.aleo.redeem_winning_tokens

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T05:50:45.090Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-41`
- Program: `doo_prediction_market.aleo`
- Function: `redeem_winning_tokens`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-10`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 87,
  "timestamp": "2026-10-03T05:50:45.090Z",
  "callId": "aleo-call-41",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.redeem_winning_tokens",
  "program": "doo_prediction_market.aleo",
  "function": "redeem_winning_tokens",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market_id",
        "value": "202610031field"
      },
      {
        "position": 1,
        "name": "outcome_token_id",
        "value": "47542102130958773753794360442534411634158207078581067571747032812316018272field"
      },
      {
        "position": 2,
        "name": "amount",
        "value": "30000u128"
      },
      {
        "position": 3,
        "name": "payout_microcredits",
        "value": "50000u64"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-10"
  },
  "result": {
    "walletRequestId": "shield_1791006645089_1h6wm8tdfcj"
  }
}
```

## 128. Submit doo_prediction_market.aleo.redeem_winning_tokens

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1cc9pxmztszs92yvfemwfpatdspyr5rzkrl2htn375zmcjafrcyqq5f20lk.

- Time: 2026-10-03T05:51:01.135Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-41`
- Program: `doo_prediction_market.aleo`
- Function: `redeem_winning_tokens`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-10`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 88,
  "timestamp": "2026-10-03T05:51:01.135Z",
  "callId": "aleo-call-41",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit doo_prediction_market.aleo.redeem_winning_tokens",
  "program": "doo_prediction_market.aleo",
  "function": "redeem_winning_tokens",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "market_id",
        "value": "202610031field"
      },
      {
        "position": 1,
        "name": "outcome_token_id",
        "value": "47542102130958773753794360442534411634158207078581067571747032812316018272field"
      },
      {
        "position": 2,
        "name": "amount",
        "value": "30000u128"
      },
      {
        "position": 3,
        "name": "payout_microcredits",
        "value": "50000u64"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-10"
  },
  "result": {
    "walletRequestId": "shield_1791006645089_1h6wm8tdfcj",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1cc9pxmztszs92yvfemwfpatdspyr5rzkrl2htn375zmcjafrcyqq5f20lk",
    "statusPollAttempts": 9,
    "timedOut": false,
    "walletError": null
  }
}
```

## 129. Read doo_prediction_market.aleo.markets[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.markets[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:51:02.084Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-42`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 89,
  "timestamp": "2026-10-03T05:51:02.084Z",
  "callId": "aleo-call-42",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

## 130. Read doo_prediction_market.aleo.collateral_pool[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.collateral_pool[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:51:02.085Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-43`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 90,
  "timestamp": "2026-10-03T05:51:02.085Z",
  "callId": "aleo-call-43",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

## 131. Read doo_prediction_market.aleo.yes_supply[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.yes_supply[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:51:02.085Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-44`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 91,
  "timestamp": "2026-10-03T05:51:02.085Z",
  "callId": "aleo-call-44",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

## 132. Read doo_prediction_market.aleo.no_supply[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.no_supply[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:51:02.086Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-45`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 92,
  "timestamp": "2026-10-03T05:51:02.086Z",
  "callId": "aleo-call-45",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

## 133. Read doo_prediction_market.aleo.resolved[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolved[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:51:02.087Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-46`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 93,
  "timestamp": "2026-10-03T05:51:02.087Z",
  "callId": "aleo-call-46",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

## 134. Read doo_prediction_market.aleo.resolutions[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolutions[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:51:02.088Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-47`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 94,
  "timestamp": "2026-10-03T05:51:02.088Z",
  "callId": "aleo-call-47",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

## 135. Read dark_optimistic_oracle.aleo.assertions[2026100304field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100304field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:51:02.088Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-48`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 95,
  "timestamp": "2026-10-03T05:51:02.088Z",
  "callId": "aleo-call-48",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

## 136. Read dark_optimistic_oracle.aleo.disputers[2026100304field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100304field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:51:02.089Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-49`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 96,
  "timestamp": "2026-10-03T05:51:02.089Z",
  "callId": "aleo-call-49",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

## 137. Read doo_prediction_market.aleo.markets[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:51:02.189Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-42`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 97,
  "timestamp": "2026-10-03T05:51:02.189Z",
  "callId": "aleo-call-42",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 138. Read dark_optimistic_oracle.aleo.disputers[2026100304field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:51:02.196Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-49`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 98,
  "timestamp": "2026-10-03T05:51:02.196Z",
  "callId": "aleo-call-49",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 139. Read doo_prediction_market.aleo.resolved[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:51:02.198Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-46`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 99,
  "timestamp": "2026-10-03T05:51:02.198Z",
  "callId": "aleo-call-46",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 140. Read doo_prediction_market.aleo.no_supply[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:51:02.201Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-45`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 100,
  "timestamp": "2026-10-03T05:51:02.201Z",
  "callId": "aleo-call-45",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 141. Read doo_prediction_market.aleo.yes_supply[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:51:02.202Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-44`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 101,
  "timestamp": "2026-10-03T05:51:02.202Z",
  "callId": "aleo-call-44",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 142. Read doo_prediction_market.aleo.resolutions[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:51:02.206Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-47`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 102,
  "timestamp": "2026-10-03T05:51:02.206Z",
  "callId": "aleo-call-47",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 143. Read dark_optimistic_oracle.aleo.assertions[2026100304field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:51:02.213Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-48`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 103,
  "timestamp": "2026-10-03T05:51:02.213Z",
  "callId": "aleo-call-48",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 144. Read doo_prediction_market.aleo.collateral_pool[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:51:02.222Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-43`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 104,
  "timestamp": "2026-10-03T05:51:02.222Z",
  "callId": "aleo-call-43",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 145. Read doo_prediction_market.aleo.markets[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.markets[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:52:00.306Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-50`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 105,
  "timestamp": "2026-10-03T05:52:00.306Z",
  "callId": "aleo-call-50",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

## 146. Read doo_prediction_market.aleo.collateral_pool[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.collateral_pool[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:52:00.307Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-51`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 106,
  "timestamp": "2026-10-03T05:52:00.307Z",
  "callId": "aleo-call-51",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

## 147. Read doo_prediction_market.aleo.yes_supply[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.yes_supply[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:52:00.308Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-52`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 107,
  "timestamp": "2026-10-03T05:52:00.308Z",
  "callId": "aleo-call-52",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

## 148. Read doo_prediction_market.aleo.no_supply[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.no_supply[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:52:00.309Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-53`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 108,
  "timestamp": "2026-10-03T05:52:00.309Z",
  "callId": "aleo-call-53",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

## 149. Read doo_prediction_market.aleo.resolved[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolved[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:52:00.309Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-54`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 109,
  "timestamp": "2026-10-03T05:52:00.309Z",
  "callId": "aleo-call-54",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

## 150. Read doo_prediction_market.aleo.resolutions[202610031field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolutions[202610031field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:52:00.310Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-55`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 110,
  "timestamp": "2026-10-03T05:52:00.310Z",
  "callId": "aleo-call-55",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

## 151. Read dark_optimistic_oracle.aleo.assertions[2026100304field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100304field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:52:00.310Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-56`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 111,
  "timestamp": "2026-10-03T05:52:00.310Z",
  "callId": "aleo-call-56",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

## 152. Read dark_optimistic_oracle.aleo.disputers[2026100304field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100304field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:52:00.312Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-57`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 112,
  "timestamp": "2026-10-03T05:52:00.312Z",
  "callId": "aleo-call-57",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  }
}
```

## 153. Read doo_prediction_market.aleo.resolutions[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:52:00.420Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-55`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 113,
  "timestamp": "2026-10-03T05:52:00.420Z",
  "callId": "aleo-call-55",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 154. Read doo_prediction_market.aleo.markets[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:52:00.426Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-50`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 114,
  "timestamp": "2026-10-03T05:52:00.426Z",
  "callId": "aleo-call-50",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 155. Read doo_prediction_market.aleo.resolved[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:52:00.426Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-54`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 115,
  "timestamp": "2026-10-03T05:52:00.426Z",
  "callId": "aleo-call-54",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 156. Read doo_prediction_market.aleo.no_supply[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:52:00.430Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-53`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 116,
  "timestamp": "2026-10-03T05:52:00.430Z",
  "callId": "aleo-call-53",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 157. Read dark_optimistic_oracle.aleo.assertions[2026100304field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:52:00.435Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-56`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 117,
  "timestamp": "2026-10-03T05:52:00.435Z",
  "callId": "aleo-call-56",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 158. Read doo_prediction_market.aleo.collateral_pool[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:52:00.440Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-51`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 118,
  "timestamp": "2026-10-03T05:52:00.440Z",
  "callId": "aleo-call-51",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 159. Read doo_prediction_market.aleo.yes_supply[202610031field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:52:00.443Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-52`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 119,
  "timestamp": "2026-10-03T05:52:00.443Z",
  "callId": "aleo-call-52",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610031field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610031field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610031field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 160. Read dark_optimistic_oracle.aleo.disputers[2026100304field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:52:00.475Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-57`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 120,
  "timestamp": "2026-10-03T05:52:00.475Z",
  "callId": "aleo-call-57",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100304field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100304field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100304field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 161. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:36:51.103Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T13:36:51.103Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-01"
  }
}
```

## 162. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:36:51.103Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T13:36:51.103Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-01"
  }
}
```

## 163. Read deployed program doo_prediction_market.aleo

**What happened:** The frontend requested: Read deployed program doo_prediction_market.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:36:51.104Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `doo_prediction_market.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T13:36:51.104Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program doo_prediction_market.aleo",
  "program": "doo_prediction_market.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "doo_prediction_market.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-01"
  }
}
```

## 164. Read deployed program doo_prediction_market.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:36:51.208Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `doo_prediction_market.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T13:36:51.208Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program doo_prediction_market.aleo",
  "program": "doo_prediction_market.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "doo_prediction_market.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 165. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:36:51.218Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T13:36:51.218Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 166. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:36:51.230Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T13:36:51.230Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 167. Refresh the latest Aleo Testnet block height for market state

**What happened:** The frontend requested: Refresh the latest Aleo Testnet block height for market state. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:04.017Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-DISPUTED-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 7,
  "timestamp": "2026-10-03T13:37:04.017Z",
  "callId": "aleo-call-4",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Refresh the latest Aleo Testnet block height for market state",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-DISPUTED-01"
  }
}
```

## 168. Refresh the latest Aleo Testnet block height for market state

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:37:04.125Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-DISPUTED-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 8,
  "timestamp": "2026-10-03T13:37:04.125Z",
  "callId": "aleo-call-4",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Refresh the latest Aleo Testnet block height for market state",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-DISPUTED-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 169. Read doo_prediction_market.aleo.markets[202610032field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.markets[202610032field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:04.127Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-DISPUTED-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 9,
  "timestamp": "2026-10-03T13:37:04.127Z",
  "callId": "aleo-call-5",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.markets[202610032field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "markets",
    "key": "202610032field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/markets/202610032field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-DISPUTED-01"
  }
}
```

## 170. Read doo_prediction_market.aleo.collateral_pool[202610032field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.collateral_pool[202610032field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:04.128Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-DISPUTED-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 10,
  "timestamp": "2026-10-03T13:37:04.128Z",
  "callId": "aleo-call-6",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.collateral_pool[202610032field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "collateral_pool",
    "key": "202610032field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/collateral_pool/202610032field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-DISPUTED-01"
  }
}
```

## 171. Read doo_prediction_market.aleo.yes_supply[202610032field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.yes_supply[202610032field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:04.128Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-DISPUTED-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 11,
  "timestamp": "2026-10-03T13:37:04.128Z",
  "callId": "aleo-call-7",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.yes_supply[202610032field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "yes_supply",
    "key": "202610032field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/yes_supply/202610032field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-DISPUTED-01"
  }
}
```

## 172. Read doo_prediction_market.aleo.no_supply[202610032field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.no_supply[202610032field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:04.129Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-DISPUTED-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 12,
  "timestamp": "2026-10-03T13:37:04.129Z",
  "callId": "aleo-call-8",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.no_supply[202610032field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "no_supply",
    "key": "202610032field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/no_supply/202610032field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-DISPUTED-01"
  }
}
```

## 173. Read doo_prediction_market.aleo.resolved[202610032field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolved[202610032field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:04.129Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-DISPUTED-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 13,
  "timestamp": "2026-10-03T13:37:04.129Z",
  "callId": "aleo-call-9",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolved[202610032field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolved",
    "key": "202610032field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolved/202610032field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-DISPUTED-01"
  }
}
```

## 174. Read doo_prediction_market.aleo.resolutions[202610032field]

**What happened:** The frontend requested: Read doo_prediction_market.aleo.resolutions[202610032field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:04.130Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `doo_prediction_market.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-DISPUTED-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 14,
  "timestamp": "2026-10-03T13:37:04.130Z",
  "callId": "aleo-call-10",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read doo_prediction_market.aleo.resolutions[202610032field]",
  "program": "doo_prediction_market.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "resolutions",
    "key": "202610032field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/doo_prediction_market.aleo/mapping/resolutions/202610032field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-DISPUTED-01"
  }
}
```

## 175. Read dark_optimistic_oracle.aleo.assertions[2026100305field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100305field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:04.131Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-DISPUTED-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 15,
  "timestamp": "2026-10-03T13:37:04.131Z",
  "callId": "aleo-call-11",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100305field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100305field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100305field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-DISPUTED-01"
  }
}
```

## 176. Read dark_optimistic_oracle.aleo.disputers[2026100305field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100305field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:04.131Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `VER-DISPUTED-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 16,
  "timestamp": "2026-10-03T13:37:04.131Z",
  "callId": "aleo-call-12",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100305field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100305field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100305field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "VER-DISPUTED-01"
  }
}
```

## 177. Read doo_prediction_market.aleo.collateral_pool[202610032field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:37:04.230Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program[Truncated]