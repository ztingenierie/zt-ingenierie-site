// Presets de mouvement caméra / style — signature de Higgsfield.
// Chaque preset injecte un fragment de prompt enrichi pour orienter le rendu.

export interface MotionPreset {
  id: string;
  label: string;
  emoji: string;
  category: "Camera" | "Style" | "VFX";
  promptSuffix: string;
}

export const PRESETS: MotionPreset[] = [
  {
    id: "bullet_time",
    label: "Bullet Time",
    emoji: "🎯",
    category: "VFX",
    promptSuffix:
      "bullet time effect, camera orbits 360 degrees around the frozen subject, dramatic slow motion, cinematic"
  },
  {
    id: "crash_zoom",
    label: "Crash Zoom",
    emoji: "💥",
    category: "Camera",
    promptSuffix: "rapid crash zoom in on the subject, snappy punch-in, high energy"
  },
  {
    id: "dolly_in",
    label: "Dolly In",
    emoji: "🎥",
    category: "Camera",
    promptSuffix: "smooth slow dolly-in toward the subject, shallow depth of field, cinematic"
  },
  {
    id: "fpv_drone",
    label: "FPV Drone",
    emoji: "🚁",
    category: "Camera",
    promptSuffix:
      "fast FPV drone fly-through, dynamic sweeping camera, aerial cinematic motion"
  },
  {
    id: "low_angle",
    label: "Low Angle Hero",
    emoji: "🦸",
    category: "Camera",
    promptSuffix: "dramatic low-angle hero shot, epic scale, volumetric light"
  },
  {
    id: "explosion",
    label: "Explosion",
    emoji: "🔥",
    category: "VFX",
    promptSuffix: "massive explosion behind the subject, debris and embers, slow motion, blockbuster"
  },
  {
    id: "cinematic",
    label: "Cinematic Film",
    emoji: "🎬",
    category: "Style",
    promptSuffix:
      "shot on 35mm film, anamorphic lens flare, rich color grade, shallow depth of field, photorealistic"
  },
  {
    id: "fashion",
    label: "Fashion Editorial",
    emoji: "👗",
    category: "Style",
    promptSuffix: "high-fashion editorial lighting, glossy magazine aesthetic, elegant slow movement"
  },
  {
    id: "noir",
    label: "Film Noir",
    emoji: "🕶️",
    category: "Style",
    promptSuffix: "black and white film noir, hard shadows, moody contrast, vintage grain"
  },
  {
    id: "golden_hour",
    label: "Golden Hour",
    emoji: "🌅",
    category: "Style",
    promptSuffix: "warm golden hour light, soft backlight, lens flare, dreamy atmosphere"
  }
];

export function getPreset(id: string): MotionPreset | undefined {
  return PRESETS.find((p) => p.id === id);
}
