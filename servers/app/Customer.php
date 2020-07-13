<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = ['code' , 'name', 'phone'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
