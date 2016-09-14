<?php

namespace App\Services;

use Illuminate\Http\Request;


class AttachmentService
{
    public function __construct()
    {
        \Cloudinary::config(config('cloudinary'));
    }

    /**
     * @param Request $request
     * @return array for create attachment Model
     */
    public function uploadAttachmentToCloud(Request $request)
    {
        if ($request->file('f')) {
            $tmp_file_path = $request->file('f')->getRealPath();
            // we need to move tmp file with new real file name because of problems with file type defining on cloud server side
            $new_tmp_file = sys_get_temp_dir() . DIRECTORY_SEPARATOR . $request->file('f')->getClientOriginalName();
            move_uploaded_file($tmp_file_path, $new_tmp_file);

            $cloud_answer = \Cloudinary\Uploader::upload($new_tmp_file,
                [
                    'resource_type' => 'auto',
                    'public_id' => time() . '_' . $request->file('f')->getClientOriginalName()
                ]);

            $attachment_data['cloud_public_id'] = $cloud_answer['public_id'];
            $attachment_data['type'] = $request->file('f')->getClientMimeType();
            $attachment_data['url'] = $cloud_answer['url'];
            unlink($new_tmp_file);

            return $attachment_data;
        }

    }


    /**
     * @param string $cloud_public_id
     */
    public function deleteAttachmentFromCloud(string $cloud_public_id)
    {
        \Cloudinary\Uploader::destroy($cloud_public_id);
    }
}