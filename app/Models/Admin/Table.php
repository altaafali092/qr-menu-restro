<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Writer;

class Table extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'qr_code_path'
    ];

    public function generateQrCode()
    {
        $fileName = "table_{$this->id}.svg";   // use SVG
        $filePath = "qrcodes/{$fileName}";
        if (Storage::disk('public')->exists($filePath)) {
            return $filePath;
        }
        $url = url("/order/{$this->id}");

        $renderer = new ImageRenderer(
            new RendererStyle(300),
            new SvgImageBackEnd()
        );

        $writer = new Writer($renderer);
        $qrCodeSvg = $writer->writeString($url);
        Storage::disk('public')->put($filePath, $qrCodeSvg);
        $this->update(['qr_code_path' => $filePath]);
        return $filePath;
    }
}
