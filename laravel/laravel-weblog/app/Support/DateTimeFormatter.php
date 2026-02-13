<?php
namespace App\Support;

use Illuminate\Support\Carbon;

class DateTimeFormatter {

    private function __construct() {}

    public static function format(Carbon $timestamp) : string {
        if ($timestamp->isToday()) {
            return "Today at " . $timestamp->format('H:i');
        } elseif ($timestamp->isYesterday()) {
            return "Yesterday at " . $timestamp->format('H:i');
        } elseif ($timestamp->isCurrentWeek()) {
            return $timestamp->format('l') . " at " . $timestamp->format('H:i');
        } else {
            return $timestamp->format('j F') . " at " . $timestamp->format('H:i');
        }
    }

}