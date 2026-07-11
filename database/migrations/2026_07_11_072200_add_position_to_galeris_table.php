<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('galeris', function (Blueprint $table) {
            $table->integer('position')->default(0)->after('tanggal');
        });

        // Backfill existing rows with auto-incrementing position values
        $galeris = DB::table('galeris')->orderBy('created_at', 'asc')->get();
        foreach ($galeris as $index => $galeri) {
            DB::table('galeris')
                ->where('id', $galeri->id)
                ->update(['position' => $index]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('galeris', function (Blueprint $table) {
            $table->dropColumn('position');
        });
    }
};
