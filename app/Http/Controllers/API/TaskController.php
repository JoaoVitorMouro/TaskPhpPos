<?php

namespace App\Http\Controllers\API;

use App\Services\TaskService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TaskController extends Controller
{

    public function __construct(
        protected TaskService $taskService
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = $this->taskService->all();
        
        return response()->json([
            'success' => true,
            'data' => $tasks,
            'message' => 'All tasks retrivied.'
        ], Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:144',
            'status' => 'required|numeric'
        ]);

        $task = $this->taskService->create($data);

        return response()->json([
            'success' => true,
            'data' => $task,
            'message' => 'Task created.'
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $task = $this->taskService->find($id);
        return response()->json([
            'success' => true,
            'data' => $task,
            'message' => 'Task found.'
        ], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $data = $request->validate([
            'name' => 'required|string|max:144',
            'status' => 'required|numeric'
        ]);

        $task = $this->taskService->update($data, $id);

        return response()->json([
            'success' => true,
            'data' => $task,
            'message' => 'Task updated.'
        ], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $this->taskService->delete($id);

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
