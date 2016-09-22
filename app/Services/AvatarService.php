<?php
namespace App\Services;
use Symfony\Component\HttpKernel\Exception\ServiceUnavailableHttpException;
use HttpRequest;

class AvatarService
{
    private $imageDir;

    public function getAvatar()
    {

        var_dump('getAvatar');
    }


    public function uploadAvatar($urlGlobalAvatar){
        var_dump('upload');
    }

    public function checkAvatarFile($nameFile){
        return file_exists(config('avatar.localAvatarBaseUrl').$nameFile);
    }

    public function resizeAvatar($imageFile, $width, $height)
    {
        switch (strtolower(strrchr($imageFile, '.'))) {
            case ".jpg":
                $image = @ImageCreateFromJPEG($this->imageDir . $imageFile);
                break;
            case ".png":
                $image = @ImageCreateFromPNG($this->imageDir . $imageFile);
                break;
            default:
                return false;
        }
        if ($image) {
            $imageWidth = @ImageSX($image);
            $imageHeight = @ImageSY($image);
            $ratioWidth = $imageWidth / $width;
            $ratioHeight = $imageHeight / $height;
            if ($ratioWidth < $ratioHeight) {
                $destWidth = intval($imageWidth / $ratioHeight);
                $destHeight = $height;
            } else {
                $destWidth = $width;
                $destHeight = intval($imageHeight / $ratioWidth);
            }
            $resImage = @ImageCreateTrueColor($destWidth, $destHeight);
            if ((!@ImageCopyResampled($resImage, $image, 0, 0, 0, 0, $destWidth, $destHeight, $imageWidth, $imageHeight)))
                return false;
            switch (strtolower(strrchr($imageFile, '.'))) {
                case ".jpg":
                    @imagejpeg($resImage, $this->imageDir . '/' . $width . 'x' . $height . '/' . $imageFile);
                    break;
                case ".png":
                    @imagepng($resImage, $this->imageDir . '/' . $width . 'x' . $height . '/' . $imageFile);
                    break;
                default:
                    return false;
            }
            return true;
        }
    }
}