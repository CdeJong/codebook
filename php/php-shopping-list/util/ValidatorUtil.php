<?php

class ValidatorUtil {

    private function __construct() {}

    public static function integer($value, $minimum, $maximum) {
        if (!preg_match('/^[+-]?\d+$/', $value)) {
            return false;
        }
        $integer = (int) $value;
        return $integer >= $minimum && $integer <= $maximum;
    }

    public static function decimal($value, $minimum, $maximum) {
        if (!preg_match('/^[+-]?(\d+(\.\d+)?|\.\d+)([eE][+-]?\d+)?$/', $value)) {
            return false;
        }
        $float = (float) $value;
        return $float >= $minimum && $float <= $maximum;
    }

    public static function string($value, $minimum = 1, $maximum = INF) {
        $length = mb_strlen($value, "utf-8"); // counts characters not bytes!!!
        return $length >= $minimum && $length <= $maximum;
    }

}