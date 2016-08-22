define({ "api": [
  {
    "type": "delete",
    "url": "topics/:id/attachments/:id",
    "title": "Delete the attachment of the topic",
    "name": "Delete_topic_attachment",
    "group": "Attachments_Topic",
    "description": "<p>Delete specific attachment of specific topic. Cloud upload storage</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Topic ID,  Attachment ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No Content",
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
            "field": "404",
            "description": "<p>Topic not found,  Attachment not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Topic not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Attachment  not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/AttachmentController.php",
    "groupTitle": "Attachments_Topic"
  },
  {
    "type": "get",
    "url": "topics/:id/attachments",
    "title": "List attachments of the topic",
    "name": "Index_topic_attachments",
    "group": "Attachments_Topic",
    "description": "<p>Returns the list of the topic attachments</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Topic ID</p>"
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
            "description": "<p>List of the Topic attachments</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n  \"data\": [\n {\n  \"id\": 51,\n  \"url\": \"http://lorempixel.com/640/480/?56978\",\n  \"cloud_public_id\": \"195\",\n  \"type\": \"image/x-portable-graymap\",\n  \"created_at\": \"2016-08-18 20:03:46\",\n  \"updated_at\": \"2016-08-18 20:03:46\",\n  \"pivot\": {\n  \"attachmenttable_id\": 81,\n  \"attachment_id\": 51\n  }\n  }\n  ],\n  \"_meta\": []\n  }",
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
            "field": "404",
            "description": "<p>Topic not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Topic not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/AttachmentController.php",
    "groupTitle": "Attachments_Topic"
  },
  {
    "type": "get",
    "url": "topics/:id/attachments/:id",
    "title": "Get the topic attachment",
    "name": "View_topic_attachment",
    "group": "Attachments_Topic",
    "description": "<p>Returns the attachment of the topic</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Topic ID, Attachment ID</p>"
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
            "field": "Json",
            "description": "<p>Topic attachment</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\"data\": {\n\"id\": 52,\n\"url\": \"http://lorempixel.com/640/480/?45068\",\n\"cloud_public_id\": \"958\",\n\"type\": \"application/vnd.kenameaapp\",\n\"created_at\": \"2016-08-18 20:03:46\",\n\"updated_at\": \"2016-08-18 20:03:46\"\n},\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Topic not found,  Attachment not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Topic not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Attachment not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/AttachmentController.php",
    "groupTitle": "Attachments_Topic"
  },
  {
    "type": "post",
    "url": "topics/:id/attachments/",
    "title": "Upload attachment of the topic",
    "name": "upload_topic_attachment",
    "group": "Attachments_Topic",
    "description": "<p>Upload attachment of specific topic. Cloud upload storage</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Topic ID</p>"
          },
          {
            "group": "Parameter",
            "type": "file",
            "optional": false,
            "field": "Key",
            "description": "<p>File  to upload, types are ...</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>multipart/form-data</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK",
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
            "field": "404",
            "description": "<p>Topic not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Topic not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/AttachmentController.php",
    "groupTitle": "Attachments_Topic"
  },
  {
    "type": "delete",
    "url": "votes/:id/attachments/:id",
    "title": "Delete the attachment of the vote",
    "name": "Delete_vote_attachment",
    "group": "Attachments_Vote",
    "description": "<p>Delete specific attachment of specific vote. Cloud upload storage</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Vote ID, Attachment ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No Content",
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
            "field": "404",
            "description": "<p>Vote not found,  Attachment not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Vote  not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Attachment  not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/AttachmentController.php",
    "groupTitle": "Attachments_Vote"
  },
  {
    "type": "get",
    "url": "votes/:id/attachments",
    "title": "List attachments of the vote",
    "name": "Index_vote_attachments",
    "group": "Attachments_Vote",
    "description": "<p>Returns the list of the attachments of the vote</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
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
            "description": "<p>List of the Vote attachments</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\n\"data\": [\n{\n\"id\": 72,\n\"url\": \"http://lorempixel.com/640/480/?60000\",\n\"cloud_public_id\": \"610\",\n\"type\": \"video/webm\",\n\"created_at\": \"2016-08-18 20:03:54\",\n\"updated_at\": \"2016-08-18 20:03:54\",\n\"pivot\": {\n\"attachmenttable_id\": 83,\n\"attachment_id\": 72\n}\n}\n],\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Vote  not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Vote not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/AttachmentController.php",
    "groupTitle": "Attachments_Vote"
  },
  {
    "type": "get",
    "url": "votes/:id/attachments/:id",
    "title": "Get the vote attachment",
    "name": "View_vote_attachment",
    "group": "Attachments_Vote",
    "description": "<p>Returns the specific attachment for specific vote</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Vote ID, Attachment ID</p>"
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
            "field": "Json",
            "description": "<p>Vote attachment</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\"data\": {\n\"id\": 72,\n\"url\": \"http://lorempixel.com/640/480/?60000\",\n\"cloud_public_id\": \"610\",\n\"type\": \"video/webm\",\n\"created_at\": \"2016-08-18 20:03:54\",\n\"updated_at\": \"2016-08-18 20:03:54\"\n},\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Vote not found,  Attachment not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Vote not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Attachment not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/AttachmentController.php",
    "groupTitle": "Attachments_Vote"
  },
  {
    "type": "post",
    "url": "votes/:id/attachments/",
    "title": "Upload attachment of the vote",
    "name": "upload_vote_attachment",
    "group": "Attachments_Vote",
    "description": "<p>Upload attachment for specific vote. Cloud upload storage</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Vote ID</p>"
          },
          {
            "group": "Parameter",
            "type": "file",
            "optional": false,
            "field": "Key",
            "description": "<p>File  to upload, types are ...</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>multipart/form-data</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK",
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
            "field": "404",
            "description": "<p>Vote not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Vote not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/AttachmentController.php",
    "groupTitle": "Attachments_Vote"
  },
  {
    "type": "get",
    "url": "topics/:id/comments",
    "title": "List comments of the topic",
    "name": "Index_topic_comments",
    "group": "Comments_Topic",
    "description": "<p>Returns the list of comments of the specific topic</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Topic ID</p>"
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
            "description": "<p>List of the Topic comments</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\"data\": [\n{\n\"id\": 201,\n\"content_origin\": \"Voluptatem ut rerum sit vitae. Sunt vero eos aspernatur. Sed quia veniam ipsa incidunt.\\nIpsam nulla quia consequuntur. Amet voluptates ex temporibus et enim. Accusamus quasi aliquid modi et.\",\n\"rating\": 737,\n\"user_id\": 53,\n\"content_generated\": \"Occaecati et culpa est aut tenetur praesentium molestias. Sit doloremque ipsum tempora sed autem iusto porro. Aut est reprehenderit temporibus aspernatur. Dignissimos quos itaque enim assumenda.\",\n\"created_at\": \"2016-08-18 20:03:46\",\n\"updated_at\": \"2016-08-18 20:03:46\",\n\"pivot\": {\n\"commentable_id\": 81,\n\"comment_id\": 201\n}\n}\n],\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Topic not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n Topic not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/CommentController.php",
    "groupTitle": "Comments_Topic"
  },
  {
    "type": "get",
    "url": "topics/:id/comments/:id",
    "title": "Get the comment of the topic",
    "name": "View_topic_comment",
    "group": "Comments_Topic",
    "description": "<p>Returns the specific comment of the specific topic</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Topic ID, Comment ID</p>"
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
            "field": "Json",
            "description": "<p>Topic comment</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\"data\": {\n\"id\": 201,\n\"content_origin\": \"Voluptatem ut rerum sit vitae. Sunt vero eos aspernatur. Sed quia veniam ipsa incidunt.\\nIpsam nulla quia consequuntur. Amet voluptates ex temporibus et enim. Accusamus quasi aliquid modi et.\",\n\"rating\": 737,\n\"user_id\": 53,\n\"content_generated\": \"Occaecati et culpa est aut tenetur praesentium molestias. Sit doloremque ipsum tempora sed autem iusto porro. Aut est reprehenderit temporibus aspernatur. Dignissimos quos itaque enim assumenda.\",\n\"created_at\": \"2016-08-18 20:03:46\",\n\"updated_at\": \"2016-08-18 20:03:46\"\n},\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Topic not found,  Comment not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n Topic not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n Comment not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/CommentController.php",
    "groupTitle": "Comments_Topic"
  },
  {
    "type": "get",
    "url": "topics/:id/comments/:id/comments",
    "title": "List comments of the comment of the topic",
    "name": "View_topic_comment_comment",
    "group": "Comments_Topic",
    "description": "<p>Returns coments of the specific comment of the specific topic</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Topic ID, Comment ID</p>"
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
            "field": "Json",
            "description": "<p>Topic comment</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\"data\": [\n{\n\"id\": 253,\n\"content_origin\": \"taugHGSJAHGsjhGA\",\n\"rating\": 0,\n\"user_id\": 52,\n\"content_generated\": null,\n\"created_at\": \"2016-08-18 22:14:12\",\n\"updated_at\": \"2016-08-18 22:14:12\",\n\"pivot\": {\n\"comment_id\": 252,\n\"commentable_id\": 253\n}\n}\n],\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Topic not found,  Comment not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n Topic not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n Comment not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/CommentController.php",
    "groupTitle": "Comments_Topic"
  },
  {
    "type": "get",
    "url": "topics/:id/comments/:id/comments:id",
    "title": "Get the comment of the comments of the topic",
    "name": "View_topic_comment_comment_comment",
    "group": "Comments_Topic",
    "description": "<p>Returns coments of the specific comment of the specific topic</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Topic ID, Comment ID, Comment ID</p>"
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
            "field": "Json",
            "description": "<p>Topic comment</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\"data\": {\n\"id\": 253,\n\"content_origin\": \"taugHGSJAHGsjhGA\",\n\"rating\": 0,\n\"user_id\": 52,\n\"content_generated\": null,\n\"created_at\": \"2016-08-18 22:14:12\",\n\"updated_at\": \"2016-08-18 22:14:12\"\n},\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Topic not found,  Comment not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n Topic not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n Comment not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/CommentController.php",
    "groupTitle": "Comments_Topic"
  },
  {
    "type": "post",
    "url": "topics/:id/comments/:id/comments",
    "title": "Add the comment to the comment to the topic",
    "name": "add_topic_comment_comment",
    "group": "Comments_Topic",
    "description": "<p>Add the comment to the comment to specific topic.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Topic ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID of user, who create comment</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Text",
            "description": "<p>Text of comment</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\"data\": {\n\"user_id\": \"52\",\n\"content_origin\": \"yusdl;slkdf;lk\",\n\"updated_at\": \"2016-08-18 22:32:12\",\n\"created_at\": \"2016-08-18 22:32:12\",\n\"id\": 256\n},\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Topic not found, Comment not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Topic not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Comment not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 400:",
          "content": "    HTTP/1.1 400 Bad request\n    {\n     {\n\"content_origin\": [\n\"Content is required\"\n],\n\"user_id\": [\n\"User not is authorized\"\n]\n}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/CommentController.php",
    "groupTitle": "Comments_Topic"
  },
  {
    "type": "post",
    "url": "topics/:id/comments/",
    "title": "Add the comment to the topic",
    "name": "add_topic_comments",
    "group": "Comments_Topic",
    "description": "<p>Add comment to specific topic.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Topic ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID of user, who create comment</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Text",
            "description": "<p>Text of comment</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 201 OK\n{\n\"data\": {\n\"user_id\": \"52\",\n\"content_origin\": \"taugHGSJAHGsjhGA\",\n\"updated_at\": \"2016-08-18 21:40:28\",\n\"created_at\": \"2016-08-18 21:40:28\",\n\"id\": 252\n},\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Topic not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Topic not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 400:",
          "content": "    HTTP/1.1 400 Bad request\n    {\n     {\n\"content_origin\": [\n\"Content is required\"\n],\n\"user_id\": [\n\"User not is authorized\"\n]\n}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/CommentController.php",
    "groupTitle": "Comments_Topic"
  },
  {
    "type": "delete",
    "url": "topics/:id/comments/:id",
    "title": "Delete the comment of the topic",
    "name": "delete_topic_comment",
    "group": "Comments_Topic",
    "description": "<p>Delete specific comment of specific topic.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Topic ID, Comment ID</p>"
          }
        ]
      }
    },
    "success": {
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
            "field": "404",
            "description": "<p>Topic not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Topic not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Comment not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/CommentController.php",
    "groupTitle": "Comments_Topic"
  },
  {
    "type": "delete",
    "url": "topics/:id/comments/:id/comments/:id",
    "title": "Delete the comment of the comment of the topic",
    "name": "delete_topic_comment_comment",
    "group": "Comments_Topic",
    "description": "<p>Delete specific comment of the comment of specific topic.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Topic ID, Comment ID,  Comment ID</p>"
          }
        ]
      }
    },
    "success": {
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
            "field": "404",
            "description": "<p>Topic not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Topic not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Comment not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/CommentController.php",
    "groupTitle": "Comments_Topic"
  },
  {
    "type": "put",
    "url": "topics/:id/comments/:id",
    "title": "Update the comment of the topic",
    "name": "update_topic_comment",
    "group": "Comments_Topic",
    "description": "<p>Update specific comment of specific topic.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Topic ID, Comment ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id of user, who create comment</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Text of comment</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 201 OK\n{\n\"data\": {\n\"user_id\": \"52\",\n\"content_origin\": \"taugHGSJAHGsjhGA\",\n\"updated_at\": \"2016-08-18 21:40:28\",\n\"created_at\": \"2016-08-18 21:40:28\",\n\"id\": 252\n},\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Topic not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Topic not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 400:",
          "content": "    HTTP/1.1 400 Bad request\n    {\n     {\n\"content_origin\": [\n\"Content is required\"\n],\n\"user_id\": [\n\"User not is authorized\"\n]\n}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/CommentController.php",
    "groupTitle": "Comments_Topic"
  },
  {
    "type": "put",
    "url": "topics/:id/comments/:id/comments:id",
    "title": "Update the comment of the comment of the topic",
    "name": "update_topic_comment_coment",
    "group": "Comments_Topic",
    "description": "<p>Update the comment of the comment of the  topic.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Topic ID, Comment ID, Comment ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id of user, who create comment</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Text of comment</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 201 OK\n{\n\"data\": {\n\"user_id\": \"52\",\n\"content_origin\": \"gajshgjk\",\n\"updated_at\": \"2016-08-18 22:32:12\",\n\"created_at\": \"2016-08-18 22:32:12\",\n\"id\": 256\n},\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Topic not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Topic not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 400:",
          "content": "    HTTP/1.1 400 Bad request\n    {\n     {\n\"content_origin\": [\n\"Content is required\"\n],\n\"user_id\": [\n\"User not is authorized\"\n]\n}\n    }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/CommentController.php",
    "groupTitle": "Comments_Topic"
  },
  {
    "type": "get",
    "url": "votes/:id/comments",
    "title": "List comments of the vote",
    "name": "Index_vote_comments",
    "group": "Comments_Vote",
    "description": "<p>Returns the list of  comments of the specific vote</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
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
            "description": "<p>List of the Vote comments</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\"data\": [\n{\n\"id\": 222,\n\"content_origin\": \"Quod fugiat fuga sit. Beatae sit corrupti repudiandae vel aut sequi. Rem laboriosam nihil molestias.\",\n\"rating\": 182,\n\"user_id\": 52,\n\"content_generated\": \"Aut magni animi architecto repellat porro ea qui. Doloremque id dolorem inventore doloribus. Impedit ut et pariatur aut. Vero nobis qui velit quibusdam.\",\n\"created_at\": \"2016-08-18 20:03:54\",\n\"updated_at\": \"2016-08-18 20:03:54\",\n\"pivot\": {\n\"commentable_id\": 83,\n\"comment_id\": 222\n}\n}\n],\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Vote not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n Vote not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/CommentController.php",
    "groupTitle": "Comments_Vote"
  },
  {
    "type": "get",
    "url": "vote/:id/comments/:id",
    "title": "Get the comment of the vote",
    "name": "View_vote_comment",
    "group": "Comments_Vote",
    "description": "<p>Returns the specific comment of the specific vote</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Vote ID, Comment ID</p>"
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
            "field": "Json",
            "description": "<p>Vote comment</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\"data\": {\n\"id\": 222,\n\"content_origin\": \"Quod fugiat fuga sit. Beatae sit corrupti repudiandae vel aut sequi. Rem laboriosam nihil molestias.\",\n\"rating\": 182,\n\"user_id\": 52,\n\"content_generated\": \"Aut magni animi architecto repellat porro ea qui. Doloremque id dolorem inventore doloribus. Impedit ut et pariatur aut. Vero nobis qui velit quibusdam.\",\n\"created_at\": \"2016-08-18 20:03:54\",\n\"updated_at\": \"2016-08-18 20:03:54\"\n},\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Vote not found,  Comment not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n Vote not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n Comment not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/CommentController.php",
    "groupTitle": "Comments_Vote"
  },
  {
    "type": "get",
    "url": "votes/:id/comments/:id/comments",
    "title": "List comments of the comment of the vote",
    "name": "View_vote_comment_comment",
    "group": "Comments_Vote",
    "description": "<p>Returns comments of the  comment of the vote</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Vote ID, Comment ID</p>"
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
            "field": "Json",
            "description": "<p>Vote comment</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\"data\": [\n{\n\"id\": 253,\n\"content_origin\": \"taugHGSJAHGsjhGA\",\n\"rating\": 0,\n\"user_id\": 52,\n\"content_generated\": null,\n\"created_at\": \"2016-08-18 22:14:12\",\n\"updated_at\": \"2016-08-18 22:14:12\",\n\"pivot\": {\n\"comment_id\": 252,\n\"commentable_id\": 253\n}\n}\n],\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Vote not found,  Comment not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n Vote not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n Comment not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/CommentController.php",
    "groupTitle": "Comments_Vote"
  },
  {
    "type": "get",
    "url": "votes/:id/comments/:id/comments:id",
    "title": "Get the comment of the comments of the vote",
    "name": "View_vote_comment_comment_comment",
    "group": "Comments_Vote",
    "description": "<p>Returns coments of the specific comment of the specific vote</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Vote ID, Comment ID, Comment ID</p>"
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
            "field": "Json",
            "description": "<p>Vote comment</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\"data\": {\n\"id\": 253,\n\"content_origin\": \"taugHGSJAHGsjhGA\",\n\"rating\": 0,\n\"user_id\": 52,\n\"content_generated\": null,\n\"created_at\": \"2016-08-18 22:14:12\",\n\"updated_at\": \"2016-08-18 22:14:12\"\n},\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Vote not found,  Comment not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n Vote not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n Comment not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/CommentController.php",
    "groupTitle": "Comments_Vote"
  },
  {
    "type": "post",
    "url": "votes/:id/comments/",
    "title": "Add comment to the vote",
    "name": "add_vote_comment",
    "group": "Comments_Vote",
    "description": "<p>Add comment to specific vote.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Vote ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID of user, who create comment</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Text",
            "description": "<p>Text of comment</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 201 OK\n{\n\"data\": {\n\"user_id\": \"52\",\n\"content_origin\": \"laksldk;lk\",\n\"updated_at\": \"2016-08-18 22:40:28\",\n\"created_at\": \"2016-08-18 22:40:28\",\n\"id\": 258\n},\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Vote not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Vote not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 400:",
          "content": "    HTTP/1.1 400 Bad request\n    {\n     {\n\"content_origin\": [\n\"Content is required\"\n],\n\"user_id\": [\n\"User not is authorized\"\n]\n}\n    }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/CommentController.php",
    "groupTitle": "Comments_Vote"
  },
  {
    "type": "post",
    "url": "votes/:id/comments/:id/comments",
    "title": "Add comment to the comment to the vote",
    "name": "add_vote_comment_comment",
    "group": "Comments_Vote",
    "description": "<p>Add comment to comment to specific vote.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Vote ID, Comment ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID of user, who create comment</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Text",
            "description": "<p>Text of comment</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\"data\": {\n\"user_id\": \"52\",\n\"content_origin\": \"yusdl;slkdf;lk\",\n\"updated_at\": \"2016-08-18 22:56:12\",\n\"created_at\": \"2016-08-18 22:56:12\",\n\"id\": 259\n},\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Vote not found, Comment not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Vote not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Comment not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 400:",
          "content": "    HTTP/1.1 400 Bad request\n    {\n     {\n\"content_origin\": [\n\"Content is required\"\n],\n\"user_id\": [\n\"User not is authorized\"\n]\n}\n    }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/CommentController.php",
    "groupTitle": "Comments_Vote"
  },
  {
    "type": "delete",
    "url": "votes/:id/comments/:id",
    "title": "Delete the comment of the vote",
    "name": "delete_vote_comment",
    "group": "Comments_Vote",
    "description": "<p>Delete specific comment of specific vote.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Vote ID, Comment ID</p>"
          }
        ]
      }
    },
    "success": {
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
            "field": "404",
            "description": "<p>Vote not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Vote not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Comment not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/CommentController.php",
    "groupTitle": "Comments_Vote"
  },
  {
    "type": "delete",
    "url": "votes/:id/comments/:id/comments/:id",
    "title": "Delete the comment of the comment of the vote",
    "name": "delete_vote_comment_comment",
    "group": "Comments_Vote",
    "description": "<p>Delete specific comment of the comment of specific vote.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Vote ID, Comment ID,  Comment ID</p>"
          }
        ]
      }
    },
    "success": {
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
            "field": "404",
            "description": "<p>Vote not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Vote not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Comment not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/CommentController.php",
    "groupTitle": "Comments_Vote"
  },
  {
    "type": "put",
    "url": "votes/:id/comments/:id",
    "title": "Update the comment of the vote",
    "name": "update_vote_comment",
    "group": "Comments_Vote",
    "description": "<p>Update specific comment of specific vote.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Vote ID, Comment ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id of user, who create comment</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Text of comment</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 201 OK\n{\n\"data\": {\n\"user_id\": \"52\",\n\"content_origin\": \"taugkjhjkhhGA\",\n\"updated_at\": \"2016-08-18 22:50:28\",\n\"created_at\": \"2016-08-18 22:50:28\",\n\"id\": 258\n},\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Vote not found, Comment not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Vote not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Comment not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 400:",
          "content": "    HTTP/1.1 400 Bad request\n    {\n     {\n\"content_origin\": [\n\"Content is required\"\n],\n\"user_id\": [\n\"User not is authorized\"\n]\n}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/CommentController.php",
    "groupTitle": "Comments_Vote"
  },
  {
    "type": "put",
    "url": "votes/:id/comments/:id/comments:id",
    "title": "Update the comment of the comment of the vote",
    "name": "update_vote_comment_coment",
    "group": "Comments_Vote",
    "description": "<p>Update specific comment of specific vote.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Vote ID, Comment ID, Comment ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id of user, who create comment</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Text of comment</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 201 OK\n{\n\"data\": {\n\"user_id\": \"52\",\n\"content_origin\": \"gajshuyuiyjk\",\n\"updated_at\": \"2016-08-18 22:59:12\",\n\"created_at\": \"2016-08-18 22:59:12\",\n\"id\": 260\n},\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Vote not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Vote not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 400:",
          "content": "    HTTP/1.1 400 Bad request\n    {\n     {\n\"content_origin\": [\n\"Content is required\"\n],\n\"user_id\": [\n\"User not is authorized\"\n]\n}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/CommentController.php",
    "groupTitle": "Comments_Vote"
  },
  {
    "type": "get",
    "url": "users/:id/messages",
    "title": "List user messages",
    "name": "Index_user_messages",
    "group": "Messages",
    "description": "<p>Returns the list of messages  of the specific user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
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
            "description": "<p>List of the User messages</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\"data\": [\n{\n\"id\": 41,\n\"user_from_id\": 51,\n\"user_to_id\": 55,\n\"message\": \"Voluptatem sequi ab quas qui quaerat voluptatibus at. Quo omnis in est. Magni ipsa minima culpa qui molestias ex minus. Magni ea commodi est inventore.\",\n\"is_read\": 1,\n\"created_at\": \"2016-08-18 20:03:52\",\n\"updated_at\": \"2016-08-18 20:03:52\"\n}\n],\n\"_meta\": {\n\"user_from\": {\n\"id\": 51,\n\"first_name\": \"Aditya\",\n\"last_name\": \"Jaskolski\",\n\"display_name\": \"verna.leffler\",\n\"email\": \"jefferey.kilback@example.com\",\n\"reputation\": 281,\n\"status_id\": 12,\n\"last_visit_at\": \"2016-02-12 05:17:40\",\n\"created_at\": \"2016-08-18 20:03:44\",\n\"updated_at\": \"2016-08-18 20:03:44\"\n},\n\"users_to\": [\n{\n\"id\": 55,\n\"first_name\": \"Joana\",\n\"last_name\": \"Leffler\",\n\"display_name\": \"johanna.rippin\",\n\"email\": \"pjohnston@example.net\",\n\"reputation\": 236,\n\"status_id\": 11,\n\"last_visit_at\": \"2016-06-04 21:12:32\",\n\"created_at\": \"2016-08-18 20:03:44\",\n\"updated_at\": \"2016-08-18 20:03:44\"\n}\n]\n}\n}",
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
            "field": "404",
            "description": "<p>User not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n User not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/MessageController.php",
    "groupTitle": "Messages"
  },
  {
    "type": "get",
    "url": "users/:id/messages/:id",
    "title": "Get the user message",
    "name": "View_user_message",
    "group": "Messages",
    "description": "<p>Returns the specific message of the specific user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User ID, Message ID</p>"
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
            "field": "Json",
            "description": "<p>User message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\"data\": {\n\"id\": 41,\n\"user_from_id\": 51,\n\"user_to_id\": 55,\n\"message\": \"Voluptatem sequi ab quas qui quaerat voluptatibus at. Quo omnis in est. Magni ipsa minima culpa qui molestias ex minus. Magni ea commodi est inventore.\",\n\"is_read\": 1,\n\"created_at\": \"2016-08-18 20:03:52\",\n\"updated_at\": \"2016-08-18 20:03:52\"\n},\n\"_meta\": {\n\"user_from\": {\n\"id\": 51,\n\"first_name\": \"Aditya\",\n\"last_name\": \"Jaskolski\",\n\"display_name\": \"verna.leffler\",\n\"email\": \"jefferey.kilback@example.com\",\n\"reputation\": 281,\n\"status_id\": 12,\n\"last_visit_at\": \"2016-02-12 05:17:40\",\n\"created_at\": \"2016-08-18 20:03:44\",\n\"updated_at\": \"2016-08-18 20:03:44\"\n},\n\"user_to\": {\n\"id\": 55,\n\"first_name\": \"Joana\",\n\"last_name\": \"Leffler\",\n\"display_name\": \"johanna.rippin\",\n\"email\": \"pjohnston@example.net\",\n\"reputation\": 236,\n\"status_id\": 11,\n\"last_visit_at\": \"2016-06-04 21:12:32\",\n\"created_at\": \"2016-08-18 20:03:44\",\n\"updated_at\": \"2016-08-18 20:03:44\"\n}\n}\n}",
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
            "field": "404",
            "description": "<p>User not found,  Message not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n User not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n Message not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/MessageController.php",
    "groupTitle": "Messages"
  },
  {
    "type": "post",
    "url": "users/:id/messages/",
    "title": "Add message of the user",
    "name": "add_User_message",
    "group": "Messages",
    "description": "<p>Add message of the specific user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_from_id",
            "description": "<p>User ID who sent message</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Text of the message</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 201 OK\n{\n\"data\": {\n\"user_from_id\": 2,\n\"user_to_id\": \"5\",\n\"message\": \"AAAA\",\n\"is_read\": \"0\",\n\"updated_at\": \"2016-08-19 07:37:12\",\n\"created_at\": \"2016-08-19 07:37:12\",\n\"id\": 16,\n},\n}\n \"_meta\": []",
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
            "field": "404",
            "description": "<p>User not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n User not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 400:",
          "content": "    HTTP/1.1 400 Bad request\n{\n\"user_from_id\": [\n\"Sender ID is required\"\n],\n\"user_to_id\": [\n\"Receiver ID is required\"\n],\n\"message\": [\n\"Message is required\"\n]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 400:",
          "content": "    HTTP/1.1 400 Bad request\n{\n\"user_to_id\": [\n\"User ID_to can not be the same as authorized\"\n]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/MessageController.php",
    "groupTitle": "Messages"
  },
  {
    "type": "delete",
    "url": "users/:id/messages/:id",
    "title": "Delete the message of the user",
    "name": "delete_user_message",
    "group": "Messages",
    "description": "<p>Delete specific user message.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User ID, Message ID</p>"
          }
        ]
      }
    },
    "success": {
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
            "field": "404",
            "description": "<p>User not found, Message not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n User not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Message not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/MessageController.php",
    "groupTitle": "Messages"
  },
  {
    "type": "put",
    "url": "users/:id/messages/:id",
    "title": "Update message of the user",
    "name": "update_User_message",
    "group": "Messages",
    "description": "<p>Update message of the specific user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User ID, Message ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_from_id",
            "description": "<p>User ID who sent message</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Text of the message</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\"data\": {\n\"id\": 46,\n\"user_from_id\": \"52\",\n\"user_to_id\": \"53\",\n\"message\": \"gAJSJHGSHa\",\n\"is_read\": 0,\n\"created_at\": \"2016-08-18 20:03:52\",\n\"updated_at\": \"2016-08-19 07:45:06\"\n},\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>User not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n User not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 400:",
          "content": "    HTTP/1.1 400 Bad request\n{\n\"user_from_id\": [\n\"Sender ID is required\"\n],\n\"user_to_id\": [\n\"Receiver ID is required\"\n],\n\"message\": [\n\"Message is required\"\n]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 400:",
          "content": "    HTTP/1.1 400 Bad request\n{\n\"user_to_id\": [\n\"User ID_to can not be the same as authorized\"\n]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/MessageController.php",
    "groupTitle": "Messages"
  },
  {
    "type": "get",
    "url": "roles/",
    "title": "List roles",
    "name": "Index_roles",
    "group": "Roles",
    "description": "<p>Returns the list of the users' roles</p>",
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
            "description": "<p>List of the Roles</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\"data\": [\n{\n\"id\": 11,\n\"name\": \"Admin\",\n\"slug\": \"admin\",\n\"description\": null,\n\"parent_id\": null,\n\"created_at\": null,\n\"updated_at\": null\n},\n{\n\"id\": 12,\n\"name\": \"User\",\n\"slug\": \"user\",\n\"description\": null,\n\"parent_id\": null,\n\"created_at\": null,\n\"updated_at\": null\n}\n],\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Topic not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n Topic not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/RoleController.php",
    "groupTitle": "Roles"
  },
  {
    "type": "get",
    "url": "topics/:id/tags",
    "title": "List tags of the topic",
    "name": "Index_topic_tags",
    "group": "Tags_Topic",
    "description": "<p>Returns the list of tags of the specific topic</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Topic ID</p>"
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
            "description": "<p>List of the Topic tags</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\"data\": [\n{\n\"id\": 185,\n\"name\": \"qui\",\n\"created_at\": \"2016-08-18 23:03:54\",\n\"updated_at\": \"2016-08-18 23:03:54\",\n\"pivot\": {\n\"taggable_id\": 88,\n\"tag_id\": 185\n}\n}\n],\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Topic not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Topic not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/TagController.php",
    "groupTitle": "Tags_Topic"
  },
  {
    "type": "get",
    "url": "topics/:id/tags/:id",
    "title": "Get the tag of the topic",
    "name": "View_topic_tag",
    "group": "Tags_Topic",
    "description": "<p>Returns the specific tag of the specific topic</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Topic ID, Tag ID</p>"
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
            "field": "Json",
            "description": "<p>Topic tag</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\"data\": {\n\"id\": 185,\n\"name\": \"qui\",\n\"created_at\": \"2016-08-18 23:03:54\",\n\"updated_at\": \"2016-08-18 23:03:54\"\n},\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Topic not found,  Tag not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Topic not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Tag not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/TagController.php",
    "groupTitle": "Tags_Topic"
  },
  {
    "type": "post",
    "url": "topics/:id/tags/",
    "title": "Add tag to the topic",
    "name": "add_topic_tag",
    "group": "Tags_Topic",
    "description": "<p>Add tag to the specific topic.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Topic ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>Name of the tag</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 201 OK\n{\n\"data\": {\n\"name\": \"ajsjsj\",\n\"updated_at\": \"2016-08-19 00:07:54\",\n\"created_at\": \"2016-08-19 00:07:54\",\n\"id\": 206\n},\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Topic not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Topic not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 400:",
          "content": "    HTTP/1.1 400 Bad request\n{\n\"name\": [\n\"Name is required\"\n]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/TagController.php",
    "groupTitle": "Tags_Topic"
  },
  {
    "type": "delete",
    "url": "topics/:id/tags/:id",
    "title": "Delete the tag of the topic",
    "name": "delete_vote_tag",
    "group": "Tags_Topic",
    "description": "<p>Delete specific tag of specific topic.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Topic ID, Tag ID</p>"
          }
        ]
      }
    },
    "success": {
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
            "field": "404",
            "description": "<p>Topic not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Topic not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Tag not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/TagController.php",
    "groupTitle": "Tags_Topic"
  },
  {
    "type": "put",
    "url": "topics/:id/tags/:id",
    "title": "Update the tag of the topic",
    "name": "update_topic_tag",
    "group": "Tags_Topic",
    "description": "<p>Update specific tag of specific topic.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Topic ID, Tag ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>Name of the tag</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "405",
            "description": "<p>Method not allowed</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 405:",
          "content": " HTTP/1.1 404 Method Not Allowed\n {\nMethod Not Allowed\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/TagController.php",
    "groupTitle": "Tags_Topic"
  },
  {
    "type": "get",
    "url": "votes/:id/tags",
    "title": "List tags of the vote",
    "name": "Index_vote_tags",
    "group": "Tags_Vote",
    "description": "<p>Returns the list of tags of the specific vote</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
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
            "description": "<p>List of the Vote tags</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\"data\": [\n{\n\"id\": 182,\n\"name\": \"qui\",\n\"created_at\": \"2016-08-18 20:03:54\",\n\"updated_at\": \"2016-08-18 20:03:54\",\n\"pivot\": {\n\"taggable_id\": 83,\n\"tag_id\": 182\n}\n}\n],\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Vote not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Vote not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/TagController.php",
    "groupTitle": "Tags_Vote"
  },
  {
    "type": "get",
    "url": "votes/:id/tags/:id",
    "title": "Get the tag of the vote",
    "name": "View_vote_tag",
    "group": "Tags_Vote",
    "description": "<p>Returns the specific tag of the specific vote</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Vote ID, Tag ID</p>"
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
            "field": "Json",
            "description": "<p>Vote tag</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n\"data\": {\n\"id\": 182,\n\"name\": \"qui\",\n\"created_at\": \"2016-08-18 20:03:54\",\n\"updated_at\": \"2016-08-18 20:03:54\"\n},\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Vote not found,  Tag not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Vote not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Tag not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/TagController.php",
    "groupTitle": "Tags_Vote"
  },
  {
    "type": "post",
    "url": "votes/:id/tags/",
    "title": "Add tag to the vote",
    "name": "add_vote_tag",
    "group": "Tags_Vote",
    "description": "<p>Add tag to the specific vote.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Vote ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>Name of the tag</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 201 OK\n{\n\"data\": {\n\"name\": \"ascc\",\n\"updated_at\": \"2016-08-19 00:07:54\",\n\"created_at\": \"2016-08-19 00:07:54\",\n\"id\": 202\n},\n\"_meta\": []\n}",
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
            "field": "404",
            "description": "<p>Vote not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Vote not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 400:",
          "content": "    HTTP/1.1 400 Bad request\n{\n\"name\": [\n\"Name is required\"\n]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/TagController.php",
    "groupTitle": "Tags_Vote"
  },
  {
    "type": "delete",
    "url": "votes/:id/tags/:id",
    "title": "Delete the tag of the vote",
    "name": "delete_vote_tag",
    "group": "Tags_Vote",
    "description": "<p>Delete specific tag of specific vote.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Vote ID, Tag ID</p>"
          }
        ]
      }
    },
    "success": {
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
            "field": "404",
            "description": "<p>Vote not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Vote not found\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 404:",
          "content": "HTTP/1.1 404 Not Found\n{\n Tag not found\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/TagController.php",
    "groupTitle": "Tags_Vote"
  },
  {
    "type": "put",
    "url": "votes/:id/tags/:id",
    "title": "Update the tag of the vote",
    "name": "update_vote_tag",
    "group": "Tags_Vote",
    "description": "<p>Update specific tag of specific vote.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Vote ID, Tag ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>Name of the tag</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "405",
            "description": "<p>Method not allowed</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 405:",
          "content": " HTTP/1.1 404 Method Not Allowed\n {\nMethod Not Allowed\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Http/Controllers/TagController.php",
    "groupTitle": "Tags_Vote"
  }
] });
