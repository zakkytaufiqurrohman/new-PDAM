<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function index()
    {
        $search = \Request::get('q');
        if($search) {
            $users = User::with('customers')->where(function($query) use ($search) {
                $query->where('name', 'LIKE', "%$search%");
            })->paginate(20);
        } else {
            $users = User::with('customers')->paginate(20);
        }
        return UserResource::collection($users);
    }

    public function handler($data, $model)
    {
        if(isset($data['password'])) {
            $model->password = bcrypt($data['password']);
        } else {
            $model->password = $model->password;
        }
        $model->name = $data['name'];
        $model->email = $data['email'];
        $model->role = $data['role'];
        $model->phone = $data['phone'];
        $model->address = $data['address'];
        return $model->save();
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string',
            'role' => 'required',
            'phone' => 'unique:users',
            'address' => 'required|min:6'
        ]);

        $user = $this->handler($request->all(), new User);
        if($user) {
            return response()->json([
                'status' => 'success',
                'data' => $user,
            ], 200);
        } else {
            return response()->json([
                'status' => 'Error'
            ], 200);
        }
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        $this->validate($request, [
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users,id,'.$user->id,
            'password' => 'sometimes|nullable|string',
            'role' => 'required',
            'phone' => 'unique:users,id,'.$user->id,
            'address' => 'required|min:6'
        ]);

        $updateUser = $this->handler($request->all(), $user);
    }

    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        return response(204);
    }
}
