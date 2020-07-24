<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Spending;
use App\Http\Resources\SpendingResource;
use Image;
use DB;

class SpendingController extends Controller
{
    public function insert(Request $request)
    {
        $message = '';
        $status = 'error';
        $code = 500;
        $data = null;
        $this->validate($request, [
            'name' => 'required',
            'total' => 'required',
            'information' => 'required',
            'img' => 'required|required|file|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        DB::beginTransaction();
        try {    
            $file = $request->file('img');
            $name = str_replace(' ', '',$file->getClientOriginalName());
            $small_thumbnail = time()."_small_".$name;
            $original = time()."_origin_".$name;
            $tujuan_thumbnail = 'img/thumbnail';
            $tujuan_original = 'img/original';
            // resize
            $img = Image::make($file->getRealPath());
            $img->resize(100, 100, function ($constraint) {
                $constraint->aspectRatio();
            })->save($tujuan_thumbnail.'/'.$small_thumbnail);
            $file->move($tujuan_original,$original);

            // store db
            $spending = new Spending;
            $spending->user_id = auth('api')->user()->id;
            $spending->name = $request->name;
            $spending->total = $request->total;
            $spending->information = $request->information;
            $spending->img = $original;
            $spending->thumbnail = $small_thumbnail;

            if ($spending->save()) {
                DB::commit();
                $message = 'spending created';
                $status = 'success';
                $data = $spending;
                $code = 200;
            }
            else {
                $message = 'insert failed';
                $code = 402;
            }
        }
        catch(\Exception $e) {
            $message = $e->getMessage();
            $image_path = $_SERVER['DOCUMENT_ROOT'].'/img/original/'.$original;
            unlink($image_path);
            $thumbnail = $_SERVER['DOCUMENT_ROOT'].'/img/thumbnail/'.$original;
            unlink($thumbnail);
        }
        return Response()->json([
            'status' => $status,
            'message' => $message,
            'data' => $data
        ], $code);

    }
    public function getSpending()
    {
        $data = Spending::with('user')->paginate(10);
        return SpendingResource::collection($data);
    }

    public function delete($id)
    {
        $status = '';
        $message = 'error';
        $data = null;
        $code = 200;
        $speds = Spending::find($id);
        if ($speds) {
            if ($speds->delete()) {
                $status = 'success';
                $message = 'delete success';
                $data = $speds;
            }
            else {
                $message = 'delete failed';
                $code = 400;
            }
        }
        else {
            $message = 'Spending not found';
            $code = 404;
        }
        return Response()->json([
            'status' => $status,
            'message' => $message,
            'data' => $data
        ], $code);
    }

    public function zoom($id)
    {
        $data = Spending::where('id', $id)->get();
        return new SpendingResource($data);
    }
}