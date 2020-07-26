<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class spending extends Model
{
    protected $fillable = [
        'user_id','name','total','information','img','thumnail'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
