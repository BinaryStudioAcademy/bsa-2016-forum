<?php
namespace App\Services;
use Symfony\Component\HttpKernel\Exception\ServiceUnavailableHttpException;
use HttpRequest;
use App\Models\User;
use App\Facades\CurlService;


class AvatarService
{

    public function getAvatar($urlAvatar, $fileName)
    {
        $response = CurlService::sendAvatarRequest($urlAvatar, $cookie = null);
        
        if (file_put_contents(getcwd().config('avatar.urlLocalAvatarSrc').$fileName, $response)) {
            if ($this->resizeAvatar($fileName, config('avatar.size'))) {
                return config('avatar.urlLocalAvatar') . $fileName;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    
    public function checkAvatarFile($nameFile){
        return file_exists(getcwd().config('avatar.urlLocalAvatar').$nameFile);
    }

    public function getFileName($user){
        if ($user instanceof User){
            $urlAvatar = $user->url_avatar;
        } else {
            $urlAvatar = $user['url_avatar'];
        }
        $arrItems = explode('/', $urlAvatar);
        return  $arrItems[count($arrItems)-1];
    }

    public function resizeAvatar($imageFile, $size)
    {
        $types = array("", "gif", "jpeg", "png");
        list($width, $height, $type) = getimagesize(getcwd() . config('avatar.urlLocalAvatarSrc') . $imageFile);
        $ext = $types[$type];

        if ($ext) {
            $func = 'imagecreatefrom'.$ext;
            $source= $func(getcwd() . config('avatar.urlLocalAvatarSrc') . $imageFile);
        } else {
            return false;
        }

        if ($source) {

            $thumbs = imagecreatetruecolor($size, $size);
            
            if ($width > $height && $width > $size) {
                imagecopyresampled($thumbs, $source, 0, 0, (($width-$height)/2), 0, $size, $size, $height, $height);
            } elseif ($height > $width && $height > $size) {
                imagecopyresampled($thumbs, $source, 0, 0, 0, 0, $size, $size, $width, $width);
            } elseif ($height == $width && $height > $size) {
                imagecopyresampled($thumbs, $source, 0, 0, 0, 0, $size, $size, $width, $width);
            } else {
                $thumbs = $source;
            }

            $func = 'image'.$ext;
            $func($thumbs, getcwd() . config('avatar.urlLocalAvatar') . $imageFile);

            return true;
        }
    }

}