Here’s a polished version of your content with improved structure, clarity, and flow, while leaving your JSON payloads untouched:

---

# Application Context & Integration

The application is designed to run seamlessly inside an **iframe** within **Next Plus MES**.
It communicates with the MES environment using **postMessage** events provided by **@nextplus/app-sdk**.

---

## Context Types

Each message includes a `type` and `data` object.

* **`type` (enum)** – The context in which the app is displayed. Possible values:

  * `Workorder.show`
  * `Page.show`
  * `ProductionEntity.show`
  * `Stock.show`
  * `FormData.show`
  * `WorkflowSessionItem.report`

* **`data`** – Varies depending on the `type`.

  * `Page.show` has **no `data` argument**.
  * All other types include detailed entity-specific information.

---

## Context Examples

### **Workorder.show**

A work order context provides detailed information about a specific production order.
Example payload:

```json
{
    "id": "8be4d280-0978-11f0-85c4-17a4d49812dc",
    "workorderNumber": "API-NXT312",
    "sku": "Part-AllFather",
    "engineeringPart": "Part-AllFather",
    "partDesc": "Part-AllFather",
    "productRev": null,
    "quantity": 2,
    "issueSufficientQuantity": 1,
    "priority": 20,
    "createdAt": "2025/03/25",
    "releasedAt": "2025/02/18",
    "expectedDate": "2030-03-18T08:00:00.000Z",
    "start": "2025/05/06 17:10:25",
    "end": "--",
    "synced": "2025-03-25T12:56:19.619Z",
    "parentWorkorderNumber": "parentWorkorderNumber-Updated",
    "project": {
      "description": "project-description-Updated",
      "projectNumber": "project-projectNumber-Updated"
    },
    "statusId": "3e8c75d1-3b7b-4416-a525-a4441056e9bf",
    "statusName": "In Progress",
    "statusType": "WO.STATUSES.IN_PROGRESS",
    "erpStatus": "erpStatus-Updated",
    "name": "Updated",
    "workflowRecordId": "72917d44-dcfe-4f19-b53f-c581444bc612",
    "nextChapterIds": [],
    "isSerial": true,
    "customer": {
      "accountNumber": "customer-accountNumber-Updated",
      "accountName": "customer-accountName-Updated"
    },
    "issueStarted": false,
    "rmaNumber": "Update-rmaNumber",
    "serviceType": "Update-serviceType",
    "callType": "Update-callType",
    "orderNumber": "Update-orderNumber",
    "orderLine": "Update-orderLine",
    "source": "local",
    "externalType": "workorder",
    "assignedUsers": [
      "64b985e0-be17-11ef-843b-516dcaa4b44c"
    ],
    "extraProperties": null,
    "erpProductionStartDate": "2030-02-18T10:39:00.559Z",
    "erpProductionEndDate": "2030-02-18T07:39:00.559Z",
    "runningOnOldVersion": false,
    "changeLog": [
      {
        "id": "dd886506-f0d5-4e28-9ba7-9fbdeb570139",
        "type": "WORKORDER_STATUS_CHANGE",
        "date": "2025-03-25T12:56:19.619Z",
        "userId": null,
        "oldStatusId": null,
        "newStatusId": "065df9c5-074e-4714-a239-9ee346e14465",
        "oldStatusName": null,
        "newStatusName": "New",
        "auto": true,
        "fields": null
      },
      {
        "id": "8facd770-030c-4fcf-98de-399e21488fb8",
        "type": "WORKORDER_STATUS_CHANGE",
        "date": "2025-03-25T12:57:42.722Z",
        "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
        "oldStatusId": "065df9c5-074e-4714-a239-9ee346e14465",
        "newStatusId": "3e8c75d1-3b7b-4416-a525-a4441056e9bf",
        "oldStatusName": "New",
        "newStatusName": "In Progress",
        "auto": false,
        "fields": null
      },
      {
        "id": "2080e04f-6c3e-495a-b17f-2e93faf5346c",
        "type": "WORKORDER_STATUS_CHANGE",
        "date": "2025-08-31T10:53:45.974Z",
        "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
        "oldStatusId": "3e8c75d1-3b7b-4416-a525-a4441056e9bf",
        "newStatusId": "bb63e9d7-7d78-44ca-ad9a-5046bc0d9ce9",
        "oldStatusName": "In Progress",
        "newStatusName": "End",
        "auto": false,
        "fields": null
      },
      {
        "id": "e009a8d7-1681-466f-913c-f09ec04ad6a4",
        "type": "WORKORDER_STATUS_CHANGE",
        "date": "2025-08-31T10:53:51.054Z",
        "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
        "oldStatusId": "bb63e9d7-7d78-44ca-ad9a-5046bc0d9ce9",
        "newStatusId": "3e8c75d1-3b7b-4416-a525-a4441056e9bf",
        "oldStatusName": "End",
        "newStatusName": "In Progress",
        "auto": false,
        "fields": null
      }
    ],
    "workorderTypeId": "f11cd17f-97c3-4562-9a2b-c475fe290e50",
    "parentWorkorderId": null,
    "workflowName": "Workflow-AllFather",
    "customerDiagnosis": "customerDiagnosis-Updated",
    "description": "description-Updated",
    "faultDescription": "faultDescription-Updated",
    "fixDescription": "fixDescription-Updated",
    "malfunctionCode": "malfunctionCode-Updated",
    "workflowId": "b6216de0-28d3-11f0-b430-2bf38e340603",
    "created": "2025-03-25T12:56:19.624Z",
    "groups": [],
    "bulkProduction": false,
    "createStock": true,
    "forms": [],
    "locks": [],
    "cycleTime": "4 months, 8 days, 20 hours, 13 minutes, 57 seconds",
    "netTime": "27 minutes, 52 seconds",
    "workflowVersion": "4",
    "serials": ", "
  }
  ```

---

### **ProductionEntity.show**

Represents the status and configuration of a production entity (e.g., a machine).
Includes statuses, triggers, OPC UA parameters, and metadata.

```json
{
    "id": "448ff430-edf5-11ef-8091-bdb4b30dfefc",
    "name": "SPO-M",
    "productionEntityTypeId": "54e8c480-aa6e-11ef-9d0f-8b52b2dec079",
    "status": "Down",
    "statusId": "78910f30-ffd5-49c4-91ad-14283b1a1588",
    "statuses": [
      {
        "id": "308c8180-a912-493a-a0fd-75c784d9ec8f",
        "name": "Up",
        "color": "#b5e61d",
        "status": "UP",
        "deletedAt": null
      },
      {
        "id": "78910f30-ffd5-49c4-91ad-14283b1a1588",
        "name": "Down",
        "color": "#f09574",
        "status": "DOWN",
        "deletedAt": null
      }
    ],
    "triggers": [
      {
        "id": "4de2f047-d5db-43a3-83ea-949d767e8eb0",
        "name": "מכונה פעילה | Boolean_01  Equals true  Or   Boolean_02  Equals true  Or   Boolean_03  Equals true -> Change Status -> UP",
        "conditions": [
          {
            "id": "cbdd93e5-b44f-47ef-bcd0-cd60d5ecc734",
            "type": "OR",
            "values": [
              {
                "field": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;i=1006",
                "type": "boolean",
                "operator": "equal",
                "value": true,
                "id": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;i=1006"
              },
              {
                "field": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;s=FakeMachine.IsActive2",
                "type": "boolean",
                "operator": "equal",
                "value": true,
                "id": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;s=FakeMachine.IsActive2"
              },
              {
                "field": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;s=FakeMachine.IsActive3",
                "type": "boolean",
                "operator": "equal",
                "value": true,
                "id": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;s=FakeMachine.IsActive3"
              }
            ],
            "actions": [
              {
                "principleType": "changeStatus",
                "principleId": "308c8180-a912-493a-a0fd-75c784d9ec8f",
                "value": ""
              }
            ]
          }
        ],
        "conditionPassedById": {
          "cbdd93e5-b44f-47ef-bcd0-cd60d5ecc734": false
        }
      },
      {
        "id": "4ab3d2bb-9cc9-419e-83a3-b55a96ca264b",
        "name": "מכונה לא פעילה | When Boolean_01 Equals false And Boolean_02 Equals false And Boolean_03 Equals false -> Change Status-> Down",
        "conditions": [
          {
            "id": "a37aee47-bbd8-418e-ba71-eb718892d4c4",
            "type": "AND",
            "values": [
              {
                "field": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;i=1006",
                "type": "boolean",
                "operator": "equal",
                "value": false,
                "id": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;i=1006"
              },
              {
                "field": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;s=FakeMachine.IsActive2",
                "type": "boolean",
                "operator": "equal",
                "value": false,
                "id": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;s=FakeMachine.IsActive2"
              },
              {
                "field": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;s=FakeMachine.IsActive3",
                "type": "boolean",
                "operator": "equal",
                "value": false,
                "id": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;s=FakeMachine.IsActive3"
              }
            ],
            "actions": [
              {
                "principleType": "changeStatus",
                "principleId": "78910f30-ffd5-49c4-91ad-14283b1a1588",
                "value": ""
              }
            ]
          }
        ],
        "conditionPassedById": {
          "a37aee47-bbd8-418e-ba71-eb718892d4c4": true
        }
      },
      {
        "id": "a5406c27-48cb-45a9-844e-83d0bdcf435a",
        "name": "Tempature_01  Equals 10  And   Temperature_02  Equals 10 -> Change Status->Up",
        "conditions": [
          {
            "id": "f8273f5f-40c9-43ce-82c4-ba6beabbd449",
            "type": "AND",
            "values": [
              {
                "field": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;i=1002",
                "type": "double",
                "operator": "equal",
                "value": 10,
                "id": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;i=1002"
              },
              {
                "field": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;s=FakeMachine.Temperature2",
                "type": "double",
                "operator": "equal",
                "value": 10,
                "id": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;s=FakeMachine.Temperature2"
              }
            ],
            "actions": [
              {
                "principleType": "changeStatus",
                "principleId": "308c8180-a912-493a-a0fd-75c784d9ec8f",
                "value": ""
              }
            ]
          }
        ],
        "conditionPassedById": {
          "f8273f5f-40c9-43ce-82c4-ba6beabbd449": false
        }
      },
      {
        "id": "806463ee-640e-4c1d-ae40-5707fe66f0ce",
        "name": "Boolean_01  Equals true -> Change Status ->Down",
        "conditions": [
          {
            "id": "ddec9bcf-0306-46d5-9db5-6532a14d8737",
            "type": "and",
            "values": [
              {
                "field": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;i=1006",
                "type": "boolean",
                "operator": "equal",
                "value": true,
                "id": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;i=1006"
              }
            ],
            "actions": [
              {
                "principleType": "changeStatus",
                "principleId": "78910f30-ffd5-49c4-91ad-14283b1a1588",
                "value": ""
              }
            ]
          }
        ],
        "conditionPassedById": {
          "ddec9bcf-0306-46d5-9db5-6532a14d8737": false
        }
      },
      {
        "id": "b3f2e980-cd69-41e0-a67c-af2e4fa27a3d",
        "name": "Temperature_02  Equals 57 -> Status Down",
        "conditions": [
          {
            "id": "f58ec2f7-b0ed-4222-bb9b-cd520efed828",
            "type": "and",
            "values": [
              {
                "field": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;s=FakeMachine.Temperature2",
                "type": "double",
                "operator": "equal",
                "value": 57,
                "id": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;s=FakeMachine.Temperature2"
              }
            ],
            "actions": [
              {
                "principleType": "changeStatus",
                "principleId": "78910f30-ffd5-49c4-91ad-14283b1a1588",
                "value": ""
              }
            ]
          }
        ],
        "conditionPassedById": {
          "f58ec2f7-b0ed-4222-bb9b-cd520efed828": false
        }
      }
    ],
    "parameters": [
      {
        "id": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;i=1006",
        "nodeId": "ns=1;i=1006",
        "name": "1:IsActive",
        "niceName": "Boolean_01",
        "precision": null,
        "maxLogPeriod": 1440,
        "parameterType": "OPC UA",
        "type": "boolean",
        "serverId": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2"
      },
      {
        "id": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;s=FakeMachine.IsActive2",
        "nodeId": "ns=1;s=FakeMachine.IsActive2",
        "name": "1:IsActive2",
        "niceName": "Boolean_02",
        "precision": null,
        "maxLogPeriod": 1440,
        "parameterType": "OPC UA",
        "type": "boolean",
        "serverId": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2"
      },
      {
        "id": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;s=FakeMachine.IsActive3",
        "nodeId": "ns=1;s=FakeMachine.IsActive3",
        "name": "1:IsActive3",
        "niceName": "Boolean_03",
        "precision": null,
        "maxLogPeriod": 720,
        "parameterType": "OPC UA",
        "type": "boolean",
        "serverId": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2"
      },
      {
        "id": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;i=1002",
        "nodeId": "ns=1;i=1002",
        "name": "1:Temperature",
        "niceName": "Tempature_01",
        "precision": 2,
        "maxLogPeriod": 1440,
        "parameterType": "OPC UA",
        "type": "number",
        "serverId": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2"
      },
      {
        "id": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2_nextplus_separator_ns=1;s=FakeMachine.Temperature2",
        "nodeId": "ns=1;s=FakeMachine.Temperature2",
        "name": "1:Temperature2",
        "niceName": "Temperature_02",
        "precision": 2,
        "maxLogPeriod": 1440,
        "parameterType": "OPC UA",
        "type": "number",
        "serverId": "ae2f43e0-96a8-11ef-85a1-e98a69b5e0f2"
      }
    ],
    "items": [],
    "created": "2025-02-18T12:38:34.483Z",
    "modified": "2025-09-10T10:32:46.362Z",
    "serverModified": "2025-09-10T10:32:46.362Z",
    "deletedAt": null,
    "deletedBy": null,
    "UserId": "4bec90d0-fcf3-11ec-b3e7-db9aace08fcb",
    "entityType": {
      "id": "54e8c480-aa6e-11ef-9d0f-8b52b2dec079",
      "name": "Metal Laser Machine-Update",
      "created": "2024-11-24T14:13:51.944Z",
      "modified": "2024-12-29T14:16:07.879Z",
      "serverModified": "2024-12-29T14:16:07.879Z",
      "deletedAt": null,
      "deletedBy": null,
      "UserId": "64b985e0-be17-11ef-843b-516dcaa4b44c"
    }
  }
```

---

### **WorkflowSessionItem.report**

Represents progress, session nodes, workflows, and related time logs.
Useful for tracking execution and operator activity within a workflow session.

Note that as session report might be multi level, the frist session in the array is the main session.

```json
[
    {
      "id": "8be71c70-0978-11f0-85c4-17a4d49812dc",
      "timeReports": [],
      "sessionNodes": [
        {
          "sessionNodeId": "b6216de0-28d3-11f0-b430-2bf38e340603_f9819262-c5e8-42cb-8764-ff046285591d_0",
          "nodeId": "f9819262-c5e8-42cb-8764-ff046285591d",
          "signs": [
            {
              "id": "0",
              "userId": "183272c0-fcf1-11ec-b3e7-db9aace08fcb"
            }
          ],
          "status": "done",
          "userId": "183272c0-fcf1-11ec-b3e7-db9aace08fcb",
          "workflowId": "b6216de0-28d3-11f0-b430-2bf38e340603"
        },
        {
          "sessionNodeId": "b6216de0-28d3-11f0-b430-2bf38e340603_5826db0c-9072-4777-8f12-13d1b617cb31_1",
          "nodeId": "5826db0c-9072-4777-8f12-13d1b617cb31",
          "signs": [
            {
              "id": "0",
              "userId": "183272c0-fcf1-11ec-b3e7-db9aace08fcb"
            }
          ],
          "status": "done",
          "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
          "workflowId": "b6216de0-28d3-11f0-b430-2bf38e340603"
        },
        {
          "sessionNodeId": "b6216de0-28d3-11f0-b430-2bf38e340603_cc7a54de-c3c0-48fa-9577-81bf4efbd17c_2",
          "nodeId": "cc7a54de-c3c0-48fa-9577-81bf4efbd17c",
          "signs": [],
          "status": "new",
          "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
          "workflowId": "b6216de0-28d3-11f0-b430-2bf38e340603"
        }
      ],
      "nodesPath": [
        {
          "sessionNodeId": "b6216de0-28d3-11f0-b430-2bf38e340603_f9819262-c5e8-42cb-8764-ff046285591d_0",
          "nodeId": "f9819262-c5e8-42cb-8764-ff046285591d",
          "userId": "183272c0-fcf1-11ec-b3e7-db9aace08fcb",
          "workflowId": "b6216de0-28d3-11f0-b430-2bf38e340603",
          "hidden": false
        },
        {
          "sessionNodeId": "b6216de0-28d3-11f0-b430-2bf38e340603_5826db0c-9072-4777-8f12-13d1b617cb31_1",
          "nodeId": "5826db0c-9072-4777-8f12-13d1b617cb31",
          "userId": "183272c0-fcf1-11ec-b3e7-db9aace08fcb",
          "workflowId": "b6216de0-28d3-11f0-b430-2bf38e340603",
          "hidden": false
        },
        {
          "sessionNodeId": "b6216de0-28d3-11f0-b430-2bf38e340603_cc7a54de-c3c0-48fa-9577-81bf4efbd17c_2",
          "nodeId": "cc7a54de-c3c0-48fa-9577-81bf4efbd17c",
          "userId": "183272c0-fcf1-11ec-b3e7-db9aace08fcb",
          "workflowId": "b6216de0-28d3-11f0-b430-2bf38e340603",
          "hidden": false
        }
      ],
      "variables": [],
      "customFields": [],
      "usedTools": [],
      "status": "In progress",
      "progress": 66,
      "netTimeSpent": 1672.8400000000001,
      "start": "2025/05/06 17:10:28",
      "end": "--",
      "stockIds": [
        "8bea29b0-0978-11f0-85c4-17a4d49812dc"
      ],
      "workorderId": "8be4d280-0978-11f0-85c4-17a4d49812dc",
      "serials": null,
      "partSku": "Part-AllFather",
      "partRev": null,
      "bom": [],
      "workflowId": "b6216de0-28d3-11f0-b430-2bf38e340603",
      "workorder": {
        "id": "8be4d280-0978-11f0-85c4-17a4d49812dc",
        "workorderNumber": "API-NXT312",
        "sku": "Part-AllFather",
        "productRev": null,
        "name": "Updated",
        "isSerial": true,
        "createStock": true
      },
      "workflowObject": {
        "id": "b6216de0-28d3-11f0-b430-2bf38e340603",
        "name": "Workflow-AllFather",
        "normalizedVersion": "4",
        "variables": [],
        "bom": [],
        "chaptersByNodeId": [],
        "bomByWorkflowId": [],
        "_globalNodes": [
          {
            "id": "f9819262-c5e8-42cb-8764-ff046285591d",
            "name": "Step1",
            "title": "Step1",
            "description": "",
            "plainDescription": " ",
            "x": -225.00666666666672,
            "y": -537.835,
            "is_root": true,
            "serial": false,
            "optional": false,
            "signsSettings": {
              "signs": [
                {
                  "id": "0",
                  "name": "Normal",
                  "certificateIds": []
                }
              ],
              "electronicSignature": false,
              "ordered": false,
              "multisign": false
            },
            "data": {},
            "actCode": "001",
            "bomItems": [],
            "chapterId": null,
            "listItemIds": [],
            "expressions": [],
            "resourceIds": [],
            "toolIds": [],
            "fieldIds": [],
            "created": "2025-03-02T11:05:46.114Z",
            "modified": "2025-05-04T12:25:24.795Z",
            "serverModified": "2025-05-04T12:25:24.795Z",
            "UserId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "originalNodeId": "f9819262-c5e8-42cb-8764-ff046285591d",
            "triggers": []
          },
          {
            "id": "5826db0c-9072-4777-8f12-13d1b617cb31",
            "name": "Step2EEditor",
            "title": "",
            "description": "<p>שלום שלום שלום</p>\n<p>XXXXXXX</p>",
            "plainDescription": "\nשלום שלום שלום\n\n\nXXXXXXX\n",
            "x": -155.00666666666672,
            "y": -327.835,
            "is_root": false,
            "serial": false,
            "optional": false,
            "signsSettings": {
              "signs": [
                {
                  "id": "0",
                  "name": "Normal",
                  "certificateIds": []
                }
              ],
              "ordered": false,
              "multisign": false
            },
            "data": {},
            "actCode": "",
            "bomItems": [],
            "chapterId": null,
            "listItemIds": [],
            "expressions": [],
            "resourceIds": [],
            "toolIds": [],
            "fieldIds": [],
            "created": "2025-03-02T11:05:52.872Z",
            "modified": "2025-05-04T12:25:21.416Z",
            "serverModified": "2025-05-04T12:25:21.416Z",
            "UserId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "originalNodeId": "5826db0c-9072-4777-8f12-13d1b617cb31"
          },
          {
            "id": "cc7a54de-c3c0-48fa-9577-81bf4efbd17c",
            "name": "Step3",
            "title": "Step3",
            "description": "",
            "plainDescription": " ",
            "x": -275.0066666666667,
            "y": -57.83499999999998,
            "is_root": false,
            "serial": false,
            "optional": false,
            "signsSettings": {
              "signs": [
                {
                  "id": "0",
                  "name": "Normal",
                  "certificateIds": []
                }
              ],
              "ordered": false,
              "multisign": false
            },
            "data": {},
            "actCode": "",
            "bomItems": [],
            "chapterId": null,
            "listItemIds": [],
            "expressions": [],
            "resourceIds": [],
            "toolIds": [],
            "fieldIds": [],
            "created": "2025-03-02T11:05:55.074Z",
            "modified": "2025-03-02T11:06:06.209Z",
            "serverModified": "2025-03-02T11:06:06.209Z",
            "UserId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "originalNodeId": "cc7a54de-c3c0-48fa-9577-81bf4efbd17c"
          }
        ],
        "_chapters": [],
        "UserId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
        "userObject": {
          "id": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
          "firstName": "roy!!",
          "lastName": "Levi!!!!!!",
          "displayName": "roy!! Levi!!!!!!"
        }
      },
      "stocks": [
        {
          "id": "8bea29b0-0978-11f0-85c4-17a4d49812dc",
          "kitStatus": false,
          "serviceCalls": [],
          "issueSufficientQuantity": 0,
          "status": "IN_PROGRESS",
          "serial": null,
          "workorderNumber": "API-NXT312",
          "sku": "Part-AllFather",
          "skuDesc": "Part-AllFather",
          "skuRev": null,
          "priority": 0,
          "indicator": 1,
          "quantity": 1,
          "start": "2025-05-06T14:10:28.059Z",
          "end": null,
          "expirationDate": null,
          "stockStatus": "PENDING",
          "source": "local",
          "changeLog": [],
          "priorityDocIds": [],
          "otherId": null,
          "_v": 3,
          "invalidQuantity": 0,
          "validQuantity": 1,
          "productionStatus": "valid",
          "availableQuantity": 0,
          "productionQuantity": 0,
          "actions": [],
          "locationIds": [],
          "workorderId": "8be4d280-0978-11f0-85c4-17a4d49812dc",
          "stockIds": [],
          "userModelIds": [],
          "created": "2025-03-25T12:56:19.659Z",
          "modified": "2025-05-06T14:10:25.769Z",
          "serverModified": "2025-05-06T14:10:28.061Z",
          "deletedAt": null,
          "deletedBy": null,
          "timeLogs": [],
          "stockItems": [],
          "workflowSessionItemId": "8be71c70-0978-11f0-85c4-17a4d49812dc",
          "isSerial": true,
          "kitItems": [],
          "depth": 0
        }
      ],
      "stockItems": [],
      "serviceCalls": [],
      "changeLogs": [],
      "level": 0,
      "sessionPart": {
        "id": "0b9ca010-f372-11ef-9d49-e992021b6487",
        "recordId": "810e15e8-d75b-408c-a2d8-eaaff42a49ee",
        "name": "Part-AllFather",
        "number": "Part-AllFather",
        "is_avaliable": true,
        "is_assembly": false,
        "isCombinated": false,
        "hasExpirationDate": false,
        "timeTracking": false,
        "cage_code": "",
        "quantity": "",
        "options": {
          "hotspot_height": 0,
          "hotspot_wight": 0,
          "hotspot_font_size": 0,
          "hotspot_opacity": ""
        },
        "description": "",
        "imageReady": false,
        "alternatives": [],
        "nodes": [],
        "convertible": [],
        "shapes": [],
        "combinationParts": [],
        "methods": [],
        "unitId": "6a87d625-a5ba-424a-bf63-118c5012b76a",
        "productId": "",
        "familyCode": "",
        "familyDesc": "",
        "revisions": [
          {
            "id": "bf6441d9-dbf8-4e29-90dd-6f4b3738c274",
            "revision": "qwaedwwddw",
            "valid": false,
            "active": true,
            "_documents": [],
            "C_NumebrFieldRevision": null,
            "C_DateFieldRevision": null
          },
          {
            "id": "350406e8-5d06-4378-9d79-1c69d3043652",
            "revision": "Rivvv",
            "valid": true,
            "active": true,
            "_documents": [
              {
                "id": "340c367d-5911-49b0-b6b6-30cc34154667",
                "title": "Link",
                "type": "LINK",
                "url": "https://qa.nextplus.io/#!/parts/edit/Part-AllFather",
                "externalId": null,
                "resourceId": null,
                "C_Variable_Number": 10
              }
            ],
            "C_NumebrFieldRevision": null,
            "C_DateFieldRevision": null
          }
        ],
        "isSerial": false,
        "isManuallyIssued": false,
        "isIssuedToKit": false,
        "serialNumberRequiredAtStart": false,
        "workorderNumbers": [
          "API-NXT424",
          "API-NXT87",
          "API-NXT86",
          "API-NXT66",
          "API-NXT83",
          "API-NXT68",
          "API-NXT431",
          "API-NXT67",
          "API-NXT423",
          "0"
        ],
        "serials": [],
        "freeStock": false,
        "autoCreate": "ACTIVE",
        "changeLog": [
          {
            "id": "1af9e691-aaba-41c7-9532-6d6989b5b507",
            "date": "2025-02-25T12:16:43.655Z",
            "type": "isSerial",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": true,
            "newValue": false
          },
          {
            "id": "7ceceff1-7774-4c4b-8904-8f62fb1db17e",
            "date": "2025-02-25T12:17:17.503Z",
            "type": "isSerial",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": false,
            "newValue": true
          },
          {
            "id": "1a902256-6f32-4dc5-a1f7-38e24693a6a4",
            "date": "2025-02-25T13:50:22.018Z",
            "type": "isSerial",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": true,
            "newValue": false
          },
          {
            "id": "b83f46a2-9c6f-415d-8f3e-9556fbb0ca5b",
            "date": "2025-02-25T13:55:59.060Z",
            "type": "isSerial",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": false,
            "newValue": true
          },
          {
            "id": "afd0af97-e544-4866-85e3-dc05c71ef810",
            "date": "2025-02-25T14:22:05.517Z",
            "type": "isSerial",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": true,
            "newValue": false
          },
          {
            "id": "748a95ea-2bd1-4f7e-bc38-07fa106c7f58",
            "date": "2025-02-25T14:22:42.794Z",
            "type": "unitId",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": "6a87d625-a5ba-424a-bf63-118c5012b76a",
            "newValue": "e7597ee0-98c7-11ee-adba-edbd47a74226"
          },
          {
            "id": "47e2962a-f292-4eab-a6f5-3fb675ad1b53",
            "date": "2025-02-27T06:44:24.383Z",
            "type": "unitId",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": "e7597ee0-98c7-11ee-adba-edbd47a74226",
            "newValue": "e15238c0-98c7-11ee-adba-edbd47a74226"
          },
          {
            "id": "9905bcec-020e-4cfd-bd67-267c6ac0b016",
            "date": "2025-02-27T06:44:24.383Z",
            "type": "isSerial",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": false,
            "newValue": true
          },
          {
            "id": "81db6bb2-5b52-4e19-bcb5-b764a8857bda",
            "date": "2025-03-11T06:14:46.314Z",
            "type": "isSerial",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": true,
            "newValue": false
          },
          {
            "id": "993c9583-bfd5-4b06-b1e9-7c0cd20acfb3",
            "date": "2025-03-11T06:14:50.956Z",
            "type": "isSerial",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": false,
            "newValue": true
          },
          {
            "id": "cd3d770e-e131-4d53-a1ed-84d64cdf1f10",
            "date": "2025-03-11T06:16:19.514Z",
            "type": "serialNumberRequiredAtStart",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": false,
            "newValue": true
          },
          {
            "id": "618cbc78-565b-4560-a72f-941bf0630c79",
            "date": "2025-03-11T06:16:25.888Z",
            "type": "serialNumberRequiredAtStart",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": true,
            "newValue": false
          },
          {
            "id": "399d307b-b9fe-430d-8f92-8dd61f646c1e",
            "date": "2025-03-11T06:16:40.335Z",
            "type": "is_assembly",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": false,
            "newValue": true
          },
          {
            "id": "ec062382-5213-49ac-a698-f2f030af0767",
            "date": "2025-03-11T06:16:40.335Z",
            "type": "nodes",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": [],
            "newValue": [
              {
                "recordId": "acdfb7da-c128-4747-bef7-03612ffa5b7f",
                "quantity": 1,
                "optional": false,
                "number": "5259809",
                "mrpDefault": true,
                "infoOnly": false
              }
            ]
          },
          {
            "id": "e0875d39-b2c4-4167-8ec7-d8159692cf37",
            "date": "2025-03-11T11:03:50.416Z",
            "type": "serialNumberRequiredAtStart",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": false,
            "newValue": true
          },
          {
            "id": "b54a029d-4d8b-4598-ba0d-90b3d46b8545",
            "date": "2025-03-11T11:03:57.473Z",
            "type": "serialNumberRequiredAtStart",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": true,
            "newValue": false
          },
          {
            "id": "d307e069-667d-4fd6-b958-ef595b220732",
            "date": "2025-03-11T11:03:57.473Z",
            "type": "hasExpirationDate",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": false,
            "newValue": true
          },
          {
            "id": "aed0d341-9120-4fcf-857e-65bc7f25e343",
            "date": "2025-03-11T11:03:57.473Z",
            "type": "isPhantom",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": false,
            "newValue": true
          },
          {
            "id": "f060681b-9634-4168-972e-9646e34f8459",
            "date": "2025-03-11T11:04:20.316Z",
            "type": "isCombinated",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": false,
            "newValue": true
          },
          {
            "id": "5e7c7936-5d6f-425a-bcc0-f4ea0c191e55",
            "date": "2025-03-11T11:04:20.316Z",
            "type": "combinationParts",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": [],
            "newValue": [
              "361651111"
            ]
          },
          {
            "id": "701dda9f-cb22-44d4-ad25-9e1acf9849fe",
            "date": "2025-03-11T11:04:28.662Z",
            "type": "isCombinated",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": true,
            "newValue": false
          },
          {
            "id": "8c070c11-5bd5-43b0-8565-c86da1f7b9ab",
            "date": "2025-03-11T11:04:28.662Z",
            "type": "combinationParts",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": [
              "361651111"
            ],
            "newValue": []
          },
          {
            "id": "48824a58-c88c-4e19-9517-1e3b44180b89",
            "date": "2025-03-11T11:04:28.662Z",
            "type": "nodes",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": [
              {
                "recordId": "acdfb7da-c128-4747-bef7-03612ffa5b7f",
                "quantity": 1,
                "optional": false,
                "number": "5259809",
                "mrpDefault": true,
                "infoOnly": false
              }
            ],
            "newValue": [
              {
                "recordId": "acdfb7da-c128-4747-bef7-03612ffa5b7f",
                "quantity": 3,
                "optional": false,
                "number": "5259809",
                "mrpDefault": true,
                "infoOnly": false
              }
            ]
          },
          {
            "id": "7dc1775e-1b51-455a-8dab-056704be9506",
            "date": "2025-03-11T11:04:39.848Z",
            "type": "is_assembly",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": true,
            "newValue": false
          },
          {
            "id": "cb045644-5822-4a6b-aa20-85597c1492c3",
            "date": "2025-03-11T11:04:39.848Z",
            "type": "alternatives",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": [],
            "newValue": [
              "4958372"
            ]
          },
          {
            "id": "049a312f-6ae2-40b3-ba3d-db4d9b4a7049",
            "date": "2025-03-11T11:04:39.848Z",
            "type": "nodes",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": [
              {
                "recordId": "acdfb7da-c128-4747-bef7-03612ffa5b7f",
                "quantity": 3,
                "optional": false,
                "number": "5259809",
                "mrpDefault": true,
                "infoOnly": false
              }
            ],
            "newValue": []
          },
          {
            "id": "78a92671-3879-4668-8a23-cdca597f363d",
            "date": "2025-03-11T11:04:44.915Z",
            "type": "alternatives",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": [
              "4958372"
            ],
            "newValue": []
          },
          {
            "id": "5780a6b5-bdf1-4011-a54e-4d7d66c9504f",
            "date": "2025-03-11T11:04:55.972Z",
            "type": "bulkProduction",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": "BY_UNIT",
            "newValue": "YES"
          },
          {
            "id": "80f358c5-e94c-4541-9e6c-ad08ee396fea",
            "date": "2025-03-11T11:05:01.814Z",
            "type": "autoCreate",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": "ACTIVE",
            "newValue": "REQUIRE_APPROVAL"
          },
          {
            "id": "00f6388b-1ff9-4a2f-97fe-ff67b558e25c",
            "date": "2025-03-11T11:05:01.814Z",
            "type": "bulkProduction",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": "YES",
            "newValue": "BY_UNIT"
          },
          {
            "id": "ae38b785-f327-40fc-9dc6-cd32c85928e1",
            "date": "2025-03-11T11:05:07.314Z",
            "type": "autoCreate",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": "REQUIRE_APPROVAL",
            "newValue": "ACTIVE"
          },
          {
            "id": "53fbf050-efa5-4710-a6a9-7de7a692c2e2",
            "date": "2025-03-11T11:05:07.314Z",
            "type": "isSerial",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": true,
            "newValue": false
          },
          {
            "id": "8e00fb01-89c2-47c2-8043-447e36c5731d",
            "date": "2025-03-11T11:05:13.553Z",
            "type": "isSerial",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": false,
            "newValue": true
          },
          {
            "id": "751abc4d-5633-41fd-aa3a-04250b30658f",
            "date": "2025-03-11T12:28:32.389Z",
            "type": "isSerial",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": true,
            "newValue": false
          },
          {
            "id": "c37670d1-ebc8-4da7-809e-5f96dcaec1aa",
            "date": "2025-03-11T12:28:53.534Z",
            "type": "isSerial",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": false,
            "newValue": true
          },
          {
            "id": "c976219a-f3cc-4bad-b05a-14aa8e65f99f",
            "date": "2025-03-17T16:08:03.639Z",
            "type": "hasExpirationDate",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": true,
            "newValue": false
          },
          {
            "id": "f13fbae5-9e80-49d0-92d4-f87a595da404",
            "date": "2025-03-17T16:08:03.639Z",
            "type": "isPhantom",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": true,
            "newValue": false
          },
          {
            "id": "2ef71aff-791a-45b2-ba8a-641c3ba914fe",
            "date": "2025-05-06T11:26:22.065Z",
            "type": "isSerial",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": true,
            "newValue": false
          },
          {
            "id": "d41dce1a-f93a-4c52-84fb-b768a198f7d9",
            "date": "2025-05-06T12:17:31.945Z",
            "type": "unitId",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": "e15238c0-98c7-11ee-adba-edbd47a74226",
            "newValue": "e7597ee0-98c7-11ee-adba-edbd47a74226"
          },
          {
            "id": "5fc16fb0-a0e8-4930-aa00-79781bae8d90",
            "date": "2025-05-06T13:48:00.917Z",
            "type": "unitId",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": "e7597ee0-98c7-11ee-adba-edbd47a74226",
            "newValue": "6a87d625-a5ba-424a-bf63-118c5012b76a"
          },
          {
            "id": "a8a23b5a-7a61-4e42-9984-70606485211e",
            "date": "2025-05-06T13:48:00.917Z",
            "type": "isSerial",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": false,
            "newValue": true
          },
          {
            "id": "2332ea5b-bb39-4f65-a62c-cdf15ab97f1c",
            "date": "2025-05-22T12:25:45.343Z",
            "type": "name",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": "Part-AllFather",
            "newValue": "Part-AllFather-dESC"
          },
          {
            "id": "a8c36bf6-688c-4ab6-8518-899976d02279",
            "date": "2025-05-25T07:52:16.212Z",
            "type": "name",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": "Part-AllFather-dESC",
            "newValue": "Part-AllFather"
          },
          {
            "id": "9339ee33-c763-4ddf-b1a0-44d75226e7e8",
            "date": "2025-05-25T07:52:16.212Z",
            "type": "isSerial",
            "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
            "oldValue": true,
            "newValue": false
          }
        ],
        "isPhantom": false,
        "bulkProduction": "BY_UNIT",
        "managedByRevision": true,
        "generateSerials": false,
        "numerator": 109,
        "paddingZeros": 0,
        "pattern": "0000001-PE222211M-{{AUTO_NUMBER}}",
        "created": "2025-02-25T12:14:21.841Z",
        "modified": "2025-05-25T07:52:16.213Z",
        "serverModified": "2025-06-10T07:45:38.407Z",
        "deletedAt": null,
        "deletedBy": null,
        "_documents": [],
        "C_Variable_Number": 10,
        "currentRevision": {
          "revision": null
        }
      },
      "timeLogReports": [
        {
          "id": "b97109f0-2a87-11f0-bd5f-319db83ac8a4",
          "workorderNumber": "API-NXT312",
          "workorderId": "8be4d280-0978-11f0-85c4-17a4d49812dc",
          "sku": "Part-AllFather",
          "serials": [],
          "sessionIds": [
            "8be71c70-0978-11f0-85c4-17a4d49812dc"
          ],
          "recordType": "AUTOMATIC",
          "chapterName": null,
          "chapterId": null,
          "type": "Normal Process",
          "start": "2025-05-06T14:10:26.881Z",
          "end": "2025-05-06T14:38:06.373Z",
          "firstEnd": "2025-05-06T14:38:06.373Z",
          "duration": 1659492,
          "userId": "183272c0-fcf1-11ec-b3e7-db9aace08fcb",
          "changeLog": [],
          "managerApprovalStatus": "NOT_NEEDED",
          "managerApprovalId": null,
          "managerApprovalTime": null,
          "workflowId": "b6216de0-28d3-11f0-b430-2bf38e340603",
          "comment": null,
          "created": "2025-05-06T14:38:06.863Z",
          "modified": "2025-05-06T14:38:06.863Z",
          "serverModified": "2025-05-06T14:38:06.863Z",
          "deletedAt": null,
          "deletedBy": null,
          "durationPerUnit": 1659492,
          "userName": "Asaf Cohen"
        },
        {
          "id": "e2114c30-32b1-11f0-af70-4d60a9b99477",
          "workorderNumber": "API-NXT312",
          "workorderId": "8be4d280-0978-11f0-85c4-17a4d49812dc",
          "sku": "Part-AllFather",
          "serials": [],
          "sessionIds": [
            "8be71c70-0978-11f0-85c4-17a4d49812dc"
          ],
          "recordType": "AUTOMATIC",
          "chapterName": null,
          "chapterId": null,
          "type": "Normal Process",
          "start": "2025-05-15T08:07:28.072Z",
          "end": "2025-05-15T08:07:32.319Z",
          "firstEnd": "2025-05-15T08:07:32.319Z",
          "duration": 4247,
          "userId": "727ec9e0-f0ff-11ea-bc0f-8b0f25f140e2",
          "changeLog": [],
          "managerApprovalStatus": "NOT_NEEDED",
          "managerApprovalId": null,
          "managerApprovalTime": null,
          "workflowId": "b6216de0-28d3-11f0-b430-2bf38e340603",
          "comment": null,
          "created": "2025-05-17T00:00:03.187Z",
          "modified": "2025-05-17T00:00:03.187Z",
          "serverModified": "2025-05-17T00:00:03.187Z",
          "deletedAt": null,
          "deletedBy": null,
          "durationPerUnit": 4247,
          "userName": "roy!! Levi!!!!!!"
        },
        {
          "id": "46a07ef0-8285-11f0-8d15-7b2eb845aed2",
          "workorderNumber": "API-NXT312",
          "workorderId": "8be4d280-0978-11f0-85c4-17a4d49812dc",
          "sku": "Part-AllFather",
          "serials": [],
          "sessionIds": [
            "8be71c70-0978-11f0-85c4-17a4d49812dc"
          ],
          "recordType": "AUTOMATIC",
          "chapterName": null,
          "chapterId": null,
          "type": "Normal Process",
          "start": "2025-08-26T14:02:08.177Z",
          "end": "2025-08-26T14:02:17.278Z",
          "firstEnd": "2025-08-26T14:02:17.278Z",
          "duration": 9101,
          "userId": "183272c0-fcf1-11ec-b3e7-db9aace08fcb",
          "changeLog": [],
          "managerApprovalStatus": "NOT_NEEDED",
          "managerApprovalId": null,
          "managerApprovalTime": null,
          "workflowId": "b6216de0-28d3-11f0-b430-2bf38e340603",
          "comment": null,
          "created": "2025-08-26T14:02:17.567Z",
          "modified": "2025-08-26T14:02:17.567Z",
          "serverModified": "2025-08-26T14:02:17.567Z",
          "deletedAt": null,
          "deletedBy": null,
          "durationPerUnit": 9101,
          "userName": "Asaf Cohen"
        }
      ],
      "productionEntityTransactions": [],
      "productionEntityEvents": [],
      "grossTime": "4 months, 9 days",
      "netTime": "27:53",
      "onlySignRecords": false,
      "toolMaterial": false,
      "filterdUsedToolIds": [],
      "progressValue": "66%",
      "plainTimeReports": [],
      "generalDetails": true,
      "title": "Workflow-AllFather | Part-AllFather",
      "formsIds": [],
      "workorderCustomFields": [
        {
          "type": "String",
          "key": "C_SERIAL_NUMBER_SUFFIX",
          "default": null,
          "display": true,
          "searchable": true,
          "filterable": true,
          "element": "text",
          "options": [],
          "translatable": false,
          "weight": 0,
          "custom": true,
          "title": "WO.C_SERIAL_NUMBER_SUFFIX",
          "value": null,
          "$$hashKey": "object:6776"
        },
        {
          "type": "Number",
          "key": "C_aaaaaa",
          "default": 5,
          "display": true,
          "searchable": true,
          "filterable": true,
          "element": "number",
          "options": [],
          "translatable": false,
          "weight": 0,
          "custom": true,
          "title": "WO.C_aaaaaa",
          "value": 5,
          "$$hashKey": "object:6777"
        },
        {
          "type": "String",
          "key": "C_select_single_new",
          "default": null,
          "display": true,
          "searchable": true,
          "filterable": true,
          "element": "select",
          "options": [
            "8715700117805",
            "3243245345",
            "22123d"
          ],
          "translatable": false,
          "weight": 0,
          "custom": true,
          "title": "WO.C_select_single_new",
          "value": null,
          "$$hashKey": "object:6778"
        },
        {
          "type": "Array",
          "key": "C_select_test_scan_update",
          "default": [],
          "display": true,
          "searchable": true,
          "filterable": true,
          "element": "select",
          "options": [
            "Adima1",
            "Adima2",
            "Adima3"
          ],
          "translatable": false,
          "weight": 0,
          "custom": true,
          "title": "WO.C_select_test_scan_update",
          "value": [],
          "$$hashKey": "object:6779"
        },
        {
          "type": "String",
          "key": "C_Test_Scan",
          "default": null,
          "display": true,
          "searchable": true,
          "filterable": true,
          "element": "text",
          "options": [],
          "translatable": false,
          "weight": 0,
          "custom": true,
          "title": "WO.C_Test_Scan",
          "value": null,
          "$$hashKey": "object:6780"
        },
        {
          "type": "Date",
          "key": "C_custom_date",
          "default": null,
          "display": true,
          "searchable": true,
          "filterable": true,
          "element": "date",
          "options": [],
          "translatable": false,
          "weight": 0,
          "custom": true,
          "title": "WO.C_custom_date",
          "value": null,
          "$$hashKey": "object:6781"
        },
        {
          "type": "String",
          "key": "C_select_single",
          "default": null,
          "display": true,
          "searchable": true,
          "filterable": true,
          "element": "select",
          "options": [
            "1",
            "2",
            "8715700117805"
          ],
          "translatable": false,
          "weight": 0,
          "custom": true,
          "title": "WO.C_select_single",
          "value": null,
          "$$hashKey": "object:6782"
        },
        {
          "type": "String",
          "key": "C_workorder_test_david",
          "default": "Adima1",
          "display": true,
          "searchable": true,
          "filterable": true,
          "element": "select",
          "options": [
            "Adima1",
            "Adima2",
            "Adima3"
          ],
          "translatable": false,
          "weight": 0,
          "custom": true,
          "title": "WO.C_workorder_test_david",
          "value": "Adima1",
          "$$hashKey": "object:6783"
        },
        {
          "type": "String",
          "key": "C_ben_test_filed_scan",
          "default": null,
          "display": true,
          "searchable": true,
          "filterable": true,
          "element": "text",
          "options": [],
          "translatable": false,
          "weight": 0,
          "custom": true,
          "title": "WO.C_ben_test_filed_scan",
          "value": null,
          "$$hashKey": "object:6784"
        },
        {
          "type": "Date",
          "key": "C_Date_Scan_Test",
          "default": null,
          "display": true,
          "searchable": true,
          "filterable": true,
          "element": "date",
          "options": [],
          "translatable": false,
          "weight": 0,
          "custom": true,
          "title": "WO.C_Date_Scan_Test",
          "value": null,
          "$$hashKey": "object:6785"
        }
      ]
    }
  ]
```

---

### **Stock.show**

Represents stock information, including quantities, serials, and status.

```json
{
    "id": "00117820-503f-11ed-9ef5-6ffc0e42329f",
    "kitStatus": false,
    "serviceCalls": [],
    "issueSufficientQuantity": 0,
    "status": "IN_PROGRESS",
    "serial": "SerialNumber123",
    "workorderNumber": "NXT-915",
    "sku": "0007",
    "skuDesc": "Guitar",
    "skuRev": "0054",
    "priority": 0,
    "indicator": 1,
    "quantity": 1,
    "start": "2022-10-20T06:18:28.380Z",
    "end": null,
    "expirationDate": null,
    "stockStatus": "PENDING",
    "source": "local",
    "changeLog": [
      {
        "id": "c7149bcf-81a3-4d9d-b551-5fcdab47cd47",
        "type": "ITEM_ATTACH",
        "date": "2022-10-20T06:19:14.835Z",
        "userId": "73bb4b50-2f8d-11ea-a295-d7bdfad8da20",
        "oldValue": null,
        "newValue": {
          "sku": "0002",
          "serial": "000257"
        }
      },
      {
        "id": "cb7143fe-2c2b-4ad6-8091-5cf762e95a29",
        "type": "ITEM_ATTACH",
        "date": "2022-10-20T06:18:53.911Z",
        "userId": "73bb4b50-2f8d-11ea-a295-d7bdfad8da20",
        "oldValue": null,
        "newValue": {
          "sku": "0005",
          "serial": "789789"
        }
      },
      {
        "id": "63d6604c-a4f7-478a-89b5-fa5f1bf66af1",
        "type": "ITEM_ATTACH",
        "date": "2022-10-20T06:18:45.691Z",
        "userId": "73bb4b50-2f8d-11ea-a295-d7bdfad8da20",
        "oldValue": null,
        "newValue": {
          "sku": "0005",
          "serial": "88889"
        }
      },
      {
        "id": "62819b1e-7a20-4bbe-aa3e-00122e84b3d0",
        "type": "ITEM_ATTACH",
        "date": "2022-10-20T06:18:45.691Z",
        "userId": "73bb4b50-2f8d-11ea-a295-d7bdfad8da20",
        "oldValue": null,
        "newValue": {
          "sku": "0002",
          "serial": "000875"
        }
      }
    ],
    "priorityDocIds": [],
    "otherId": null,
    "_v": 3,
    "invalidQuantity": 0,
    "validQuantity": 1,
    "productionStatus": "valid",
    "availableQuantity": 0,
    "productionQuantity": 0,
    "actions": [],
    "locationIds": [],
    "workorderId": "000cbd30-503f-11ed-9ef5-6ffc0e42329f",
    "stockIds": [],
    "userModelIds": [],
    "created": "2022-10-20T06:18:23.266Z",
    "modified": "2025-06-16T10:57:16.753Z",
    "serverModified": "2025-06-16T10:57:16.753Z",
    "deletedAt": null,
    "deletedBy": null,
    "timeLogs": [],
    "stockItems": [
      {
        "id": "0d6de120-503f-11ed-9ef5-6ffc0e42329f",
        "sku": "0002",
        "serial": "000875",
        "quantity": 1,
        "attachType": "MANUAL",
        "isSerial": true,
        "kitItemId": "c26c88bb-78bb-4d7f-88e3-dc08f42ae66f"
      },
      {
        "id": "0d6de121-503f-11ed-9ef5-6ffc0e42329f",
        "sku": "0005",
        "serial": "88889",
        "quantity": 1,
        "attachType": "MANUAL",
        "isSerial": true,
        "kitItemId": "15eb4a2d-31f4-4c37-8a42-eca942caeb66"
      },
      {
        "id": "1253ffd0-503f-11ed-9ef5-6ffc0e42329f",
        "sku": "0005",
        "serial": "789789",
        "quantity": 1,
        "attachType": "MANUAL",
        "isSerial": true,
        "kitItemId": "15eb4a2d-31f4-4c37-8a42-eca942caeb66"
      },
      {
        "id": "1ec9b250-503f-11ed-9ef5-6ffc0e42329f",
        "sku": "0002",
        "serial": "000257",
        "quantity": 1,
        "attachType": "MANUAL",
        "isSerial": true,
        "kitItemId": "c26c88bb-78bb-4d7f-88e3-dc08f42ae66f"
      }
    ],
    "workflowSessionItemId": "000f0720-503f-11ed-9ef5-6ffc0e42329f",
    "UserId": "1d8ae950-dc2f-11ed-8b92-a96960c3acf3",
    "isSerial": true,
    "kitItems": [
      {
        "quantity": 2,
        "issuedQuantity": -1,
        "sku": "0002",
        "partDesc": "Pick-ups",
        "isSerial": true,
        "issuedToKit": false,
        "manualIssue": true,
        "unit": "kilogram",
        "rev": "0001",
        "act": null,
        "serials": [],
        "kitLines": [],
        "id": "c26c88bb-78bb-4d7f-88e3-dc08f42ae66f"
      },
      {
        "quantity": 2,
        "issuedQuantity": -1,
        "sku": "0005",
        "partDesc": "Strings",
        "isSerial": true,
        "issuedToKit": false,
        "manualIssue": true,
        "unit": "kilogram",
        "rev": "0003",
        "act": null,
        "serials": [],
        "kitLines": [],
        "id": "15eb4a2d-31f4-4c37-8a42-eca942caeb66"
      }
    ]
  }
```

---

### **FormData.show**

Represents workflow form data and its relation to sessions, work orders, and stock.
Contains field values, user assignments, and approval workflows.

```json
{
    "id": "1181cfcd-bcba-418a-a7d1-10a8cd0fddea",
    "number": 7065,
    "formId": "242972e0-b5ce-11ed-93a5-0baee60f234b",
    "sessionId": "86d11a40-fd91-11ee-a9da-bf3226092ed5",
    "serial": null,
    "workorderId": "c2f9a650-fd86-11ee-a6fe-ed6a3a6dee46",
    "workorderNumber": "NXT-2860",
    "sessionNodeId": "68bbc5d0-e5e2-11ee-b137-e7ef2bf8a60c_8c6a3569-0ec5-4394-952b-72b67c5e3e02_0",
    "nodeId": "8c6a3569-0ec5-4394-952b-72b67c5e3e02",
    "originalNodeId": "8c6a3569-0ec5-4394-952b-72b67c5e3e02",
    "nodeName": "Step 1",
    "workflowId": "68bbc5d0-e5e2-11ee-b137-e7ef2bf8a60c",
    "originalWorkflowId": "68bbc5d0-e5e2-11ee-b137-e7ef2bf8a60c",
    "workflowName": "RoboPag",
    "recordId": "17b966e3-a051-4cc0-b3d8-954e07f8820b",
    "workflowVersion": 2,
    "workflowSubVersion": 0,
    "workflowNormalizedVersion": "2",
    "openInPreview": false,
    "partSku": "RoboPag",
    "partRev": "0903",
    "hasStatus": false,
    "unassigned": false,
    "removeAssignee": false,
    "assignee": [
      "73bb4b50-2f8d-11ea-a295-d7bdfad8da20"
    ],
    "viewers": [
      "183272c0-fcf1-11ec-b3e7-db9aace08fcb",
      "73bb4b50-2f8d-11ea-a295-d7bdfad8da20"
    ],
    "status": null,
    "ownerId": "73bb4b50-2f8d-11ea-a295-d7bdfad8da20",
    "closedBy": null,
    "closedAt": null,
    "fields": [
      {
        "id": "a70cfc13-176c-478b-9ade-3a1cc4d8b93f",
        "fieldId": "4dae54a0-ade5-11ed-99b4-83ee83c1e9ba",
        "value": 10
      },
      {
        "id": "f1d270ee-0ab2-415f-a398-b91c7f485e36",
        "fieldId": "789e26e0-ade5-11ed-8dab-23b4f6970906",
        "value": null
      }
    ],
    "statuses": [],
    "changeLog": [],
    "approvalWorkflow": null,
    "_v": 5,
    "stockSku": "RoboPag",
    "stockSerial": "TheSerialOfTheDayyyy",
    "stockLot": null,
    "requireDeviceLink": true,
    "linkedTo": [],
    "linkedFrom": [],
    "stringNumber": "7065",
    "originStockId": "c2fd76e0-fd86-11ee-a6fe-ed6a3a6dee46",
    "created": "2024-04-18T14:42:15.000Z",
    "modified": "2024-10-01T13:02:16.582Z",
    "serverModified": "2024-10-01T13:02:16.582Z",
    "deletedAt": null,
    "deletedBy": null,
    "UserId": "73bb4b50-2f8d-11ea-a295-d7bdfad8da20",
    "createdBy": "73bb4b50-2f8d-11ea-a295-d7bdfad8da20",
    "stockId": null,
    "node_C_index": null,
    "context": "session",
    "orderNumber": "",
    "sessionObject": {
      "id": "86d11a40-fd91-11ee-a9da-bf3226092ed5",
      "recordId": "17b966e3-a051-4cc0-b3d8-954e07f8820b",
      "workorderId": "c2f9a650-fd86-11ee-a6fe-ed6a3a6dee46",
      "indicator": 4,
      "serials": [],
      "partSku": "RoboPag",
      "partRev": "0903",
      "workorder": {
        "id": "c2f9a650-fd86-11ee-a6fe-ed6a3a6dee46",
        "workorderNumber": "NXT-2860",
        "sku": "RoboPag",
        "productRev": "0903",
        "source": "local"
      }
    },
    "linkedToForms": [],
    "linkedFromForms": [],
    "displayFieldsObject": {
      "a70cfc13-176c-478b-9ade-3a1cc4d8b93f": {
        "hide": false,
        "options": []
      },
      "f1d270ee-0ab2-415f-a398-b91c7f485e36": {
        "hide": false,
        "options": []
      }
    },
    "stockSerialOrLot": "TheSerialOfTheDayyyy",
    "a70cfc13-176c-478b-9ade-3a1cc4d8b93f": 10,
    "hasLogs": false,
    "stockDesc": "RoboPag",
    "isPartSerial": true
}
  ```

---

## Common Metadata

All context types include the following base properties:

```json
{
  "baseUrl": "https://<subdomain>.nextplus.io",
  "user": {
    "id": "183272c0-fcf1-11ec-b3e7-db9aace08fcb", // logged in user id
    "username": "", // logged in username
    "email": "", // logged in email
    "firstName": "", // logged in first name
    "lastName": "", // logged in last name
    "displayName": "" // logged in display name (usually firstName + lastName)
  }
}
```

---

## Developer Notes

* You can explore available entity types, methods, and properties in:

  * `node_modules/@nextplus/app-sdk/node_modules/@nextplus/js-sdk/src/sdk/types.gen.ts`
  * `node_modules/@nextplus/app-sdk/node_modules/@nextplus/js-sdk/src/sdk/sdk.gen.ts`

* The SDK automatically handles payload serialization. **Do not use `JSON.stringify`** when sending payloads.
