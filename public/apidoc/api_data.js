define({ "api": [
  {
    "type": "post",
    "url": "/users",
    "title": "Create user",
    "name": "Create_User",
    "group": "Users",
    "description": "<p>Returns the user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "No",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "User",
            "description": "<p>User like {key:value,}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 201 Created\n{\n        \"data\": [\n            {\n            \"id\": 1,\n            \"first_name\": \"Dayna\",\n            \"last_name\": \"Glover\",\n            \"display_name\": \"jesse.crist\",\n            \"email\": \"lcollier@example.org\",\n            \"reputation\": 959,\n            \"status_id\": 2,\n            \"last_visit_at\": \"2016-01-03 22:07:14\",\n            \"created_at\": \"2016-08-17 07:54:19\",\n            \"updated_at\": \"2016-08-17 07:54:19\"\n            }\n        ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/UserController.php",
    "groupTitle": "Users"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete specific user",
    "name": "Delete_User",
    "group": "Users",
    "description": "<p>Delete the user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>User ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204 No content": [
          {
            "group": "Success 204 No content",
            "optional": false,
            "field": "Empty",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModelNotFoundException",
            "description": "<p><code>404</code> User not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PDOException",
            "description": "<p><code>500</code> Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "User not found",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/UserController.php",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Index users",
    "name": "Index_Users",
    "group": "Users",
    "description": "<p>Returns the list of the users.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "No",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "List",
            "description": "<p>List of the Users like [{key:value,}, {key:value,}]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n        \"data\": [\n            {\n            \"id\": 1,\n            \"first_name\": \"Dayna\",\n            \"last_name\": \"Glover\",\n            \"display_name\": \"jesse.crist\",\n            \"email\": \"lcollier@example.org\",\n            \"reputation\": 959,\n            \"status_id\": 2,\n            \"last_visit_at\": \"2016-01-03 22:07:14\",\n            \"created_at\": \"2016-08-17 07:54:19\",\n            \"updated_at\": \"2016-08-17 07:54:19\"\n            },\n            {\n            \"id\": 2,\n            \"first_name\": \"Pierce\",\n            \"last_name\": \"Morissette\",\n            \"display_name\": \"kreinger\",\n            \"email\": \"dayne.hessel@example.com\",\n            \"reputation\": 472,\n            \"status_id\": 2,\n            \"last_visit_at\": \"2016-05-17 10:26:08\",\n            \"created_at\": \"2016-08-17 07:54:19\",\n            \"updated_at\": \"2016-08-17 07:54:19\"\n            },\n            {\n            \"id\": 3,\n            \"first_name\": \"Esta\",\n            \"last_name\": \"Robel\",\n            \"display_name\": \"devon79\",\n            \"email\": \"pquigley@example.com\",\n            \"reputation\": 922,\n            \"status_id\": 2,\n            \"last_visit_at\": \"2015-10-24 03:47:00\",\n            \"created_at\": \"2016-08-17 07:54:19\",\n            \"updated_at\": \"2016-08-17 07:54:19\"\n        ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/UserController.php",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Show user",
    "name": "Show_User",
    "group": "Users",
    "description": "<p>Returns the user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>User ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "User",
            "description": "<p>User like {key:value,}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 Ok\n{\n        \"data\": [\n            {\n            \"id\": 1,\n            \"first_name\": \"Dayna\",\n            \"last_name\": \"Glover\",\n            \"display_name\": \"jesse.crist\",\n            \"email\": \"lcollier@example.org\",\n            \"reputation\": 959,\n            \"status_id\": 2,\n            \"last_visit_at\": \"2016-01-03 22:07:14\",\n            \"created_at\": \"2016-08-17 07:54:19\",\n            \"updated_at\": \"2016-08-17 07:54:19\"\n            }\n            ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/UserController.php",
    "groupTitle": "Users"
  },
  {
    "type": "put",
    "url": "/users/:id/roles",
    "title": "Show role for specific user",
    "name": "Show_Users_Role",
    "group": "Users",
    "description": "<p>Show role for user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>User ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "User",
            "description": "<p>and Role like {key:value,}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"data\": [\n        {\n        \"id\": 2,\n        \"name\": \"User\",\n        \"slug\": \"user\",\n        \"description\": null,\n        \"parent_id\": null,\n        \"created_at\": null,\n        \"updated_at\": null,\n        \"pivot\": {\n        \"user_id\": 2,\n        \"role_id\": 2,\n        \"created_at\": \"2016-08-17 07:54:20\",\n        \"updated_at\": \"2016-08-17 07:54:20\",\n        \"granted\": 1\n        }\n    }\n    ],\n    \"_meta\": {\n        \"user\": {\n            \"id\": 2,\n            \"first_name\": \"Pierce\",\n            \"last_name\": \"Morissette\",\n            \"display_name\": \"kreinger\",\n            \"email\": \"dayne.hessel@example.com\",\n            \"reputation\": 472,\n            \"status_id\": 2,\n            \"last_visit_at\": \"2016-05-17 10:26:08\",\n            \"created_at\": \"2016-08-17 07:54:19\",\n            \"updated_at\": \"2016-08-17 07:54:19\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModelNotFoundException",
            "description": "<p><code>404</code> User not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "User not found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/UserController.php",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/user",
    "title": "Show logged in user",
    "name": "Show_logged_in_user",
    "group": "Users",
    "description": "<p>Returns the user.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "User",
            "description": "<p>User like {key:value,}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 Ok\n{\n        \"data\": [\n            {\n            \"id\": 1,\n            \"first_name\": \"Dayna\",\n            \"last_name\": \"Glover\",\n            \"display_name\": \"jesse.crist\",\n            \"email\": \"lcollier@example.org\",\n            \"reputation\": 959,\n            \"status_id\": 2,\n            \"last_visit_at\": \"2016-01-03 22:07:14\",\n            \"created_at\": \"2016-08-17 07:54:19\",\n            \"updated_at\": \"2016-08-17 07:54:19\"\n            }\n            ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/UserController.php",
    "groupTitle": "Users"
  },
  {
    "type": "put",
    "url": "/users/:id",
    "title": "Update specific user",
    "name": "Update_User",
    "group": "Users",
    "description": "<p>Updates the unique user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>User ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "User",
            "description": "<p>the User like {key:value,}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n        \"data\": [\n            {\n            \"id\": 1,\n            \"first_name\": \"Dayna\",\n            \"last_name\": \"Glover\",\n            \"display_name\": \"jesse.crist\",\n            \"email\": \"lcollier@example.org\",\n            \"reputation\": 959,\n            \"status_id\": 2,\n            \"last_visit_at\": \"2016-01-03 22:07:14\",\n            \"created_at\": \"2016-08-17 07:54:19\",\n            \"updated_at\": \"2016-08-17 07:54:19\"\n            }\n            ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModelNotFoundException",
            "description": "<p><code>404</code> User not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "User not found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/UserController.php",
    "groupTitle": "Users"
  },
  {
    "type": "put",
    "url": "/users/:id/roles/:id",
    "title": "Update role for specific user",
    "name": "Update_Users_Role",
    "group": "Users",
    "description": "<p>Updates the role for user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>User ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "User",
            "description": "<p>and Role like {key:value,}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n        \"data\": [\n            {\n            \"id\": 1,\n            \"first_name\": \"Dayna\",\n            \"last_name\": \"Glover\",\n            \"display_name\": \"jesse.crist\",\n            \"email\": \"lcollier@example.org\",\n            \"reputation\": 959,\n            \"status_id\": 2,\n            \"last_visit_at\": \"2016-01-03 22:07:14\",\n            \"created_at\": \"2016-08-17 07:54:19\",\n            \"updated_at\": \"2016-08-17 07:54:19\"\n            }\n            {\n     \"role\":{\n                \"name\": \"User\",\n                \"slug\": \"user\",\n                \"created_at\": \"2016-08-17 07:54:21\",\n                \"updated_at\": \"2016-08-17 07:54:21\",\n                }\n     }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModelNotFoundException",
            "description": "<p><code>404</code> User not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "User not found",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "Role not found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/UserController.php",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/votes/:id/voteitems",
    "title": "Create new voteitem",
    "name": "Create_VoteItem",
    "group": "VoteItems",
    "description": "<p>Creates a new voteitem belongs to specific vote(IdeaHub).</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Vote ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "VoteItem",
            "description": "<p>the VoteItem like {key:value,}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 201 Created\n{\n        \"data\": {\n            \"id\": 8,\n            \"vote_id\": 8,\n            \"name\": \"Rerum qui repudiandae iste blanditiis.\",\n            \"user_id\": 10,\n            \"created_at\": \"2016-08-17 07:54:48\",\n            \"updated_at\": \"2016-08-17 07:54:48\"\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDeniedException",
            "description": "<p><code>403</code> User needs to have permissions to action</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModelNotFoundException",
            "description": "<p><code>404</code> Vote not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "You don't have a required ['voteitems'] permission.",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "Vote not found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/VoteItemController.php",
    "groupTitle": "VoteItems"
  },
  {
    "type": "delete",
    "url": "/votes/:id/voteitems/:id",
    "title": "Delete specific voteItem",
    "name": "Delete_voteItem",
    "group": "VoteItems",
    "description": "<p>Deletes the unique id voteItem according users permissions. Only Administrator or owner can delete voteItem.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Vote ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204 No content": [
          {
            "group": "Success 204 No content",
            "optional": false,
            "field": "Empty",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDeniedException",
            "description": "<p><code>403</code> User needs to have permissions to action</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModelNotFoundException",
            "description": "<p><code>404</code> Vote not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "You don't have a required ['voteitems'] permission.",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "Vote not found",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "VoteItem not found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/VoteItemController.php",
    "groupTitle": "VoteItems"
  },
  {
    "type": "get",
    "url": "/votes/:id/voteitems",
    "title": "Index voteItems belongs to specific vote(IdeaHub)",
    "name": "Index_VoteItems",
    "group": "VoteItems",
    "description": "<p>Returns the list of the voteItems for specific vote(IdeaHub).</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Votes unique ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "List",
            "description": "<p>List of the VoteItems like [{key:value,}, {key:value,}]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\n{\n        \"data\": [\n            {\n            \"id\": 8,\n            \"vote_id\": 8,\n            \"name\": \"Rerum qui repudiandae iste blanditiis.\",\n            \"user_id\": 10,\n            \"created_at\": \"2016-08-17 07:54:48\",\n            \"updated_at\": \"2016-08-17 07:54:48\"\n            },\n            {\n            \"id\": 29,\n            \"vote_id\": 8,\n            \"name\": \"Eos in sunt earum.\",\n            \"user_id\": 6,\n            \"created_at\": \"2016-08-17 07:54:51\",\n            \"updated_at\": \"2016-08-17 07:54:51\"\n            }\n        ],\n        \"_meta\": {\n            \"vote\": {\n                \"id\": 8,\n                \"user_id\": 7,\n                \"title\": \"qui\",\n                \"finished_at\": \"2016-08-23 07:08:33\",\n                \"is_single\": 1,\n                \"is_public\": 1,\n                \"created_at\": \"2016-08-17 07:54:34\",\n                \"updated_at\": \"2016-08-17 07:54:34\",\n                \"is_saved\": 1\n            }\n        }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModelNotFoundException",
            "description": "<p><code>404</code> Vote not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Vote not found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/VoteItemController.php",
    "groupTitle": "VoteItems"
  },
  {
    "type": "put",
    "url": "/votes/:id/voteitems/:id",
    "title": "Update specific voteitem",
    "name": "Update_VoteItem",
    "group": "VoteItems",
    "description": "<p>Updates the unique VoteItem according users permissions. Administrator or owner can update VoteItem.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Vote ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "List",
            "description": "<p>List of the VoteItems like [{key:value,}]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n \"data\": {\n            \"id\": 8,\n            \"vote_id\": 8,\n            \"name\": \"Rerum qui repudiandae iste blanditiis.\",\n            \"user_id\": 10,\n            \"created_at\": \"2016-08-17 07:54:48\",\n            \"updated_at\": \"2016-08-17 07:54:48\"\n        },\n        \"_meta\": {\n            \"vote\": {\n                \"id\": 8,\n                \"user_id\": 7,\n                \"title\": \"qui\",\n                \"finished_at\": \"2016-08-23 07:08:33\",\n                \"is_single\": 1,\n                \"is_public\": 1,\n                \"created_at\": \"2016-08-17 07:54:34\",\n                \"updated_at\": \"2016-08-17 07:54:34\",\n                \"is_saved\": 1\n            }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDeniedException",
            "description": "<p><code>403</code> User needs to have permissions to action</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModelNotFoundException",
            "description": "<p><code>404</code> Vote not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "You don't have a required ['voteitems'] permission.",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "Vote not found",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "VoteItem not found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/VoteItemController.php",
    "groupTitle": "VoteItems"
  },
  {
    "type": "get",
    "url": "/votes/:id/voteitems/:id",
    "title": "View specific VoteItem",
    "name": "View_VoteItem",
    "group": "VoteItems",
    "description": "<p>Returns the unique VoteItem belongs to specific vote.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Vote ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "VoteItem",
            "description": "<p>the VoteItem like {key:value,}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n        \"data\": {\n            \"id\": 8,\n            \"vote_id\": 8,\n            \"name\": \"Rerum qui repudiandae iste blanditiis.\",\n            \"user_id\": 10,\n            \"created_at\": \"2016-08-17 07:54:48\",\n            \"updated_at\": \"2016-08-17 07:54:48\"\n        },\n        \"_meta\": {\n            \"vote\": {\n                \"id\": 8,\n                \"user_id\": 7,\n                \"title\": \"qui\",\n                \"finished_at\": \"2016-08-23 07:08:33\",\n                \"is_single\": 1,\n                \"is_public\": 1,\n                \"created_at\": \"2016-08-17 07:54:34\",\n                \"updated_at\": \"2016-08-17 07:54:34\",\n                \"is_saved\": 1\n            },\n            \"user\": {\n                \"id\": 10,\n                \"first_name\": \"Ephraim\",\n                \"last_name\": \"Ziemann\",\n                \"display_name\": \"stephanie30\",\n                \"email\": \"lelia.murray@example.net\",\n                \"reputation\": 228,\n                \"status_id\": 2,\n                \"last_visit_at\": \"2015-11-09 20:25:28\",\n                \"created_at\": \"2016-08-17 07:54:19\",\n                \"updated_at\": \"2016-08-17 07:54:19\"\n            }\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDeniedException",
            "description": "<p><code>403</code> User needs to have permissions to action</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModelNotFoundException",
            "description": "<p><code>404</code> Vote not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "You don't have a required ['voteitems'] permission.",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "Vote not found",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "VoteItem not found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/VoteItemController.php",
    "groupTitle": "VoteItems"
  },
  {
    "type": "post",
    "url": "/votes/",
    "title": "Create new vote",
    "name": "Create_Vote",
    "group": "Votes",
    "description": "<p>Creates a new vote (IdeaHub).</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "No",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "Vote",
            "description": "<p>the Vote like {key:value,}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 201 Created\n{\n        \"data\": {\n            \"id\": 7,\n            \"user_id\": 9,\n            \"title\": \"cupiditate\",\n            \"finished_at\": \"2016-08-26 07:08:33\",\n            \"is_single\": 1,\n            \"is_public\": 1,\n            \"created_at\": \"2016-08-17 07:54:33\",\n            \"updated_at\": \"2016-08-17 07:54:33\",\n            \"is_saved\": 1\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDeniedException",
            "description": "<p><code>403</code> User needs to have permissions to action</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "You don't have a required ['create'] permission.",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/VoteController.php",
    "groupTitle": "Votes"
  },
  {
    "type": "delete",
    "url": "/votes/:id",
    "title": "Delete specific vote",
    "name": "Delete_vote",
    "group": "Votes",
    "description": "<p>Deletes the unique vote according users permissions. Only Administrator or owner can delete vote.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Vote ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204 No content": [
          {
            "group": "Success 204 No content",
            "optional": false,
            "field": "Empty",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDeniedException",
            "description": "<p><code>403</code> User needs to have permissions to action</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModelNotFoundException",
            "description": "<p><code>404</code> Vote not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "You don't have a required ['delete'] permission.",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "Vote not found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/VoteController.php",
    "groupTitle": "Votes"
  },
  {
    "type": "get",
    "url": "/users/:id/votes",
    "title": "Users votes (IdeaHubs)",
    "name": "Index_Votes",
    "group": "Votes",
    "description": "<p>Returns the list of the votes belongs to user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>User ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "List",
            "description": "<p>of the Votes like {key:value,}, {key:value,}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n\n\"data\":  {\n    \"id\": 13,\n    \"user_id\": 3,\n    \"title\": \"harum\",\n    \"finished_at\": \"2016-08-24 07:08:33\",\n    \"is_single\": 1,\n    \"is_public\": 1,\n    \"created_at\": \"2016-08-17 07:54:34\",\n    \"updated_at\": \"2016-08-17 07:54:34\",\n    \"is_saved\": 0\n    },\n    {\n    \"id\": 20,\n    \"user_id\": 3,\n    \"title\": \"nihil\",\n    \"finished_at\": \"2016-09-01 07:09:33\",\n    \"is_single\": 1,\n    \"is_public\": 1,\n    \"created_at\": \"2016-08-17 07:54:34\",\n    \"updated_at\": \"2016-08-17 07:54:34\",\n    \"is_saved\": 1\n    }\n\"_meta\": {\n    \"user\": {\n        \"id\": 3,\n        \"first_name\": \"Horace\",\n        \"last_name\": \"Muller\",\n        \"display_name\": \"tcarter\",\n        \"email\": \"leannon.genoveva@example.org\",\n        \"reputation\": 255,\n        \"status_id\": 1,\n        \"last_visit_at\": \"2016-05-01 09:11:06\",\n        \"created_at\": \"2016-08-17 07:54:19\",\n        \"updated_at\": \"2016-08-17 07:54:19\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDeniedException",
            "description": "<p><code>403</code> User needs to have permissions to action</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModelNotFoundException",
            "description": "<p><code>404</code> User not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "You don't have a required ['index'] permission.",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "User not found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/VoteController.php",
    "groupTitle": "Votes"
  },
  {
    "type": "get",
    "url": "/votes",
    "title": "Index vote (IdeaHub)",
    "name": "Index_Votes",
    "group": "Votes",
    "description": "<p>Returns the list of the votes (IdeaHubs).</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "No",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "List",
            "description": "<p>of the Votes like {key:value,}, {key:value,}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n\"data\": [\n{\n\"data\": {\n\"id\": 7,\n\"user_id\": 9,\n\"title\": \"cupiditate\",\n\"finished_at\": \"2016-08-26 07:08:33\",\n\"is_single\": 1,\n\"is_public\": 1,\n\"created_at\": \"2016-08-17 07:54:33\",\n\"updated_at\": \"2016-08-17 07:54:33\",\n\"is_saved\": 1\n},\n\"_meta\": {\n\"user\": {\n\"id\": 9,\n\"first_name\": \"Horace\",\n\"last_name\": \"Muller\",\n\"display_name\": \"tcarter\",\n\"email\": \"leannon.genoveva@example.org\",\n\"reputation\": 255,\n\"status_id\": 1,\n\"last_visit_at\": \"2016-05-01 09:11:06\",\n\"created_at\": \"2016-08-17 07:54:19\",\n\"updated_at\": \"2016-08-17 07:54:19\"\n},\n\"likes\": 1,\n\"tags\": 1,\n\"comments\": 1\n}\n},\n{\n\"data\": {\n\"id\": 8,\n\"user_id\": 7,\n\"title\": \"qui\",\n\"finished_at\": \"2016-08-23 07:08:33\",\n\"is_single\": 1,\n\"is_public\": 1,\n\"created_at\": \"2016-08-17 07:54:34\",\n\"updated_at\": \"2016-08-17 07:54:34\",\n\"is_saved\": 1\n},\n\"_meta\": {\n\"user\": {\n\"id\": 7,\n\"first_name\": \"Jamaal\",\n\"last_name\": \"Schimmel\",\n\"display_name\": \"damon.wintheiser\",\n\"email\": \"iohara@example.com\",\n\"reputation\": 188,\n\"status_id\": 1,\n\"last_visit_at\": \"2016-08-12 10:35:05\",\n\"created_at\": \"2016-08-17 07:54:19\",\n\"updated_at\": \"2016-08-17 07:54:19\"\n},\n\"likes\": 1,\n\"tags\": 1,\n\"comments\": 1\n}\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDeniedException",
            "description": "<p><code>403</code> User needs to have permissions to action</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "You don't have a required ['index'] permission.",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "Vote not found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/VoteController.php",
    "groupTitle": "Votes"
  },
  {
    "type": "put",
    "url": "/votes/:id",
    "title": "Update specific vote (IdeaHub).",
    "name": "Update_Vote",
    "group": "Votes",
    "description": "<p>Updates the unique vote according users permissions. Administrator or owner can update vote.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Vote ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "Vote",
            "description": "<p>the Vote like {key:value,}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n        \"data\": {\n            \"id\": 7,\n            \"user_id\": 9,\n            \"title\": \"cupiditate\",\n            \"finished_at\": \"2016-08-26 07:08:33\",\n            \"is_single\": 1,\n            \"is_public\": 1,\n            \"created_at\": \"2016-08-17 07:54:33\",\n            \"updated_at\": \"2016-08-17 07:54:33\",\n            \"is_saved\": 1\n        }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDeniedException",
            "description": "<p><code>403</code> User needs to have permissions to action</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModelNotFoundException",
            "description": "<p><code>404</code> Vote not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "You don't have a required ['update'] permission.",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "Vote not found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/VoteController.php",
    "groupTitle": "Votes"
  },
  {
    "type": "get",
    "url": "/users/:id/votes/:id",
    "title": "Users vote (IdeaHub)",
    "name": "Users_vote",
    "group": "Votes",
    "description": "<p>Returns the vote (IdeaHubs) belongs to user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>User ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "Vote",
            "description": "<p>the Vote like {key:value,}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n\"data\": {\n    \"id\": 7,\n    \"user_id\": 9,\n    \"title\": \"cupiditate\",\n    \"finished_at\": \"2016-08-26 07:08:33\",\n    \"is_single\": 1,\n    \"is_public\": 1,\n    \"created_at\": \"2016-08-17 07:54:33\",\n    \"updated_at\": \"2016-08-17 07:54:33\",\n    \"is_saved\": 1\n},\n\"_meta\": {\n    \"user\": {\n        \"id\": 7,\n        \"first_name\": \"Jamaal\",\n        \"last_name\": \"Schimmel\",\n        \"display_name\": \"damon.wintheiser\",\n        \"email\": \"iohara@example.com\",\n        \"reputation\": 188,\n        \"status_id\": 1,\n        \"last_visit_at\": \"2016-08-12 10:35:05\",\n        \"created_at\": \"2016-08-17 07:54:19\",\n        \"updated_at\": \"2016-08-17 07:54:19\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDeniedException",
            "description": "<p><code>403</code> User needs to have permissions to action</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModelNotFoundException",
            "description": "<p><code>404</code> User not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "You don't have a required ['view'] permission.",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "User not found",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "Vote not found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/VoteController.php",
    "groupTitle": "Votes"
  },
  {
    "type": "get",
    "url": "/votes/:id",
    "title": "View specific Vote",
    "name": "View_Vote",
    "group": "Votes",
    "description": "<p>Returns the unique Vote (IdeaHub).</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Vote ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "Vote",
            "description": "<p>the Vote like {key:value,}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"data\": {\n        \"id\": 7,\n        \"user_id\": 9,\n        \"title\": \"cupiditate\",\n        \"finished_at\": \"2016-08-26 07:08:33\",\n        \"is_single\": 1,\n        \"is_public\": 1,\n        \"created_at\": \"2016-08-17 07:54:33\",\n        \"updated_at\": \"2016-08-17 07:54:33\",\n        \"is_saved\": 1\n    },\n    \"_meta\": {\n        \"user\": {\n            \"id\": 9,\n            \"first_name\": \"Horace\",\n            \"last_name\": \"Muller\",\n            \"display_name\": \"tcarter\",\n            \"email\": \"leannon.genoveva@example.org\",\n            \"reputation\": 255,\n            \"status_id\": 1,\n            \"last_visit_at\": \"2016-05-01 09:11:06\",\n            \"created_at\": \"2016-08-17 07:54:19\",\n            \"updated_at\": \"2016-08-17 07:54:19\"\n        },\n        \"likes\": 1,\n        \"tags\": 1,\n        \"comments\": 1\n        }\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDeniedException",
            "description": "<p><code>403</code> User needs to have permissions to action</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModelNotFoundException",
            "description": "<p><code>404</code> Vote not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "You don't have a required ['view'] permission.",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "Vote not found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/VoteController.php",
    "groupTitle": "Votes"
  }
] });
