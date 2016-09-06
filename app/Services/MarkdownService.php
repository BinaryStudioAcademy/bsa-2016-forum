<?php

namespace App\Services;
use \Michelf\MarkdownExtra;


class MarkdownService
{
    public function baseConvert($str)
    {
        $parser = new MarkdownExtra;
        $convertedStr = $parser->transform($str);

        return $convertedStr;
    }
}