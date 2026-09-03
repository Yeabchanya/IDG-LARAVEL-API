<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    function signup(Request $request)
    {
        // validate request
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|max:10|confirmed'
        ]);

        // create user store in database
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password
        ]);

        // return response 
        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
    }

    function signin(Request $request)
    {
        // validate request
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string|min:6|max:10'
        ]);

        // check user password
        $user = User::where('email', $request->email)->first();

        // virify password
        if (!Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'password' => 'Password does not match.',
            ]);
        }

        // generate token
        $token = $user->createToken('auth_token')->plainTextToken;

        // return response
        return response([
            'message' => 'User signed in.',
            'user' => $user,
            'token' => $token
        ], 200);

    }
}

