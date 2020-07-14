<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $table = 'customers';
    protected $fillable = ['code' , 'name', 'phone', 'user_id', 'address'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public static function generateCode($digits) 
    {
        $temp = "";
        for ($i = 0; $i < $digits; $i++) {
            $temp .= rand(0, 9);
        }
        return (int)$temp;
    }
}
