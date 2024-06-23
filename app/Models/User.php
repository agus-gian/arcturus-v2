<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use Plank\Metable\Metable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasRoles, Metable, SoftDeletes, HasApiTokens;

    protected function getMetaClassName(): string
    {
        return UserMeta::class;
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function transport(): HasOne
    {
        return $this->hasOne(Transport::class);
    }

    public function affiliate(): HasOne
    {
        return $this->hasOne(Affiliate::class);
    }

    public function hotels(): HasMany
    {
        return $this->hasMany(Property::class);
    }

    public function profile_picture_url(): string
    {
        return 'https://ui-avatars.com/api/?name='.urlencode($this->name).'&background=eef3ff&color=1761fd&bold=true';
    }

    public function role_name()
    {
        return $this->getRoleNames()[0];
    }

    public function role_name_label()
    {
        return Str::of($this->role_name())->replace('-','')->title();
    }
}
