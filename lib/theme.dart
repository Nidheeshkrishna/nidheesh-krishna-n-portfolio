import 'package:flutter/material.dart';

// =====================================================================
// Color Palette — mirrors the React Tailwind theme exactly
// =====================================================================
class AppColors {
  AppColors._();

  static const luxuryBlack  = Color(0xFF08080a);
  static const luxuryCard   = Color(0xFF0e0f14);
  static const luxuryBorder = Color(0xFF1e202b);
  static const bg0          = Color(0xFF0b0c16); // gradient top
  static const bg1          = Color(0xFF040509); // gradient mid
  static const bg2          = Color(0xFF020204); // gradient bottom
  static const bgCard       = Color(0xFF07080b);
  static const bgCard2      = Color(0xFF0c0d12);
  static const bgInput      = Color(0xFF111218);
  static const bgRow        = Color(0xFF10121d);

  // Gold palette
  static const gold300 = Color(0xFFd9be6d);
  static const gold400 = Color(0xFFc9a244);
  static const gold500 = Color(0xFFb5892b);
  static const gold600 = Color(0xFF9c6e20);
  static const gold900 = Color(0xFF42260d);

  static const emerald400 = Color(0xFF34d399);
  static const emerald500 = Color(0xFF10b981);
  static const emerald600 = Color(0xFF059669);

  static const teamsBlue   = Color(0xFF6264A7);
  static const teamsLight  = Color(0xFFa3a5e7);

  static const textGray = Color(0xFFa0a5b5);
}

// =====================================================================
// Typography helpers — mirrors font-mono / font-serif / font-sans
// =====================================================================
class AppText {
  AppText._();

  static const mono = 'JetBrainsMono';
  static const serif = 'PlayfairDisplay';
  static const sans = 'Inter';
}

// =====================================================================
// Gold linear gradient (left → right)
// =====================================================================
const kGoldGradient = LinearGradient(
  colors: [AppColors.gold300, AppColors.gold400, AppColors.gold500],
);

const kGoldGradientLR = LinearGradient(
  begin: Alignment.centerLeft,
  end: Alignment.centerRight,
  colors: [AppColors.gold600, AppColors.gold400, AppColors.gold900],
);

// Background top→bottom gradient
const kBgGradient = LinearGradient(
  begin: Alignment.topCenter,
  end: Alignment.bottomCenter,
  colors: [AppColors.bg0, AppColors.bg1, AppColors.bg2],
);

// Gold text gradient (shimmer)
const kGoldTextGradient = LinearGradient(
  begin: Alignment.topLeft,
  end: Alignment.bottomRight,
  colors: [Color(0xFFf4edd0), AppColors.gold300, AppColors.gold500],
);

// =====================================================================
// Responsive font-size helpers — scale with screen width
// =====================================================================
double _fontScale(double width) => (width / 1200).clamp(0.70, 1.0);

double rfs(BuildContext context, double desktopSize) =>
    desktopSize * _fontScale(MediaQuery.of(context).size.width);

double rw(double width, double desktopSize) =>
    desktopSize * _fontScale(width);
