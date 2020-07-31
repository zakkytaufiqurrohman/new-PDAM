<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Setting;
use App\Http\Resources\SettingResource;
use Image;

class SettingController extends Controller
{
    //
    public function index()
    {
        $data = Setting::first();
        return new SettingResource($data);
    }
    public function update(Request $request, $id)
    {
        $status = 'error';
        $code = '500';
        $message = '';
        $data = [];
        $this->validate($request, [
            'logo' => 'sometimes',
            'harga' => 'required'
        ]);
        $setting = Setting::find($id);
        $logo = $setting->logo;
        if ($setting) {
            if ($request->logo != $setting->logo) {
                $rand = rand();
                $exten = '.' .explode('/', explode(':', substr($request->logo, 0, strpos($request->logo, ';')))[1])[1];
                $name = time()."_logo_".$rand.$exten;
                // tujuan
                $tujuan = 'img/logo';
                //resize
                $img = Image::make($request->logo);
                $img->resize(100, 100, function ($constraint) {
                    $constraint->aspectRatio();
                })->save($tujuan.'/'.$name);
                $logo = $name;
            }
            $setting->logo = $logo;
            $setting->harga = $request->harga;
            if ($setting->save()) {
                $message = 'updated';
                $status = 'success';
                $data = $setting;
                $code = '201';
            }
            else {
                $message = 'update failed';
                $code = '422';
            }
        }
        else {
            $message = 'data tidak ditemukan';
            $code = '411';
        }
        
        return Response()->json([
            'status' => $status,
            'message' => $message,
            'data' => $data
        ]);
    }
}
