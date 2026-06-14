import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:url_launcher/url_launcher.dart';
import 'theme.dart';
import 'data.dart';
import 'download_helper.dart';

// ─────────────────────────────────────────────────────────────────────
void main() => runApp(const PortfolioApp());

class PortfolioApp extends StatelessWidget {
  const PortfolioApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Nidheesh Krishna N | Flutter Portfolio',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: AppColors.luxuryBlack,
        fontFamily: 'Inter',
      ),
      home: const PortfolioHome(),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────
// Root page
// ─────────────────────────────────────────────────────────────────────
class PortfolioHome extends StatefulWidget {
  const PortfolioHome({super.key});
  @override
  State<PortfolioHome> createState() => _PortfolioHomeState();
}

class _PortfolioHomeState extends State<PortfolioHome> {
  String activeTab = 'architecture';
  String selectedProjectId = 'mobicom';
  bool isMeetOpen = false;
  bool isEmailOpen = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.luxuryBlack,
      body: Stack(
        children: [
          // ── Background gradient
          Positioned.fill(
            child: Container(decoration: const BoxDecoration(gradient: kBgGradient)),
          ),
          // ── Ambient glow orbs
          _buildGlowOrb(top: -50, left: -80, size: 380, color: AppColors.gold500, opacity: 0.06, duration: 12),
          _buildGlowOrb(bottom: -80, right: -100, size: 460, color: AppColors.gold500, opacity: 0.06, duration: 18),
          _buildGlowOrb(top: null, right: 60, size: 260, color: const Color(0xFF78550a), opacity: 0.04, duration: 15, center: true),
          // ── Grid overlay
          Positioned.fill(child: IgnorePointer(
            child: Opacity(
              opacity: 0.15,
              child: Container(
                decoration: const BoxDecoration(
                  image: DecorationImage(
                    image: NetworkImage(''),
                    repeat: ImageRepeat.repeat,
                  ),
                ),
              ),
            ),
          )),
          // ── Main scroll content
          Column(
            children: [
              // Top gold bar
              Container(height: 6, decoration: const BoxDecoration(gradient: kGoldGradientLR)),
              // Header
              _Header(onEmail: () => setState(() => isEmailOpen = true), onDownloadCV: _downloadCV),
              // Body scroll
              Expanded(
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 32),
                        child: ConstrainedBox(
                          constraints: const BoxConstraints(maxWidth: 1280),
                          child: Column(
                            children: [
                              // Hero
                              _HeroSection(
                                onMeetTap: () => setState(() => isMeetOpen = !isMeetOpen),
                                isMeetOpen: isMeetOpen,
                                onCloseMeet: () => setState(() => isMeetOpen = false),
                                onEmail: () => setState(() => isEmailOpen = true),
                              ).animate().fadeIn(duration: 600.ms),
                              const SizedBox(height: 48),
                              // Workspace
                              _WorkspaceSection(
                                activeTab: activeTab,
                                onTabChanged: (t) => setState(() => activeTab = t),
                                selectedProjectId: selectedProjectId,
                                onProjectChanged: (id) => setState(() => selectedProjectId = id),
                              ).animate(delay: 200.ms).fadeIn(duration: 600.ms),
                              const SizedBox(height: 80),
                              const _Footer(),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
          // ── WhatsApp float button
          Positioned(
            bottom: 24,
            right: 24,
            child: const _WhatsAppButton(),
          ),
          // ── Email modal
          if (isEmailOpen)
            _EmailModal(onClose: () => setState(() => isEmailOpen = false)),
        ],
      ),
    );
  }

  Widget _buildGlowOrb({
    double? top, double? bottom, double? left, double? right,
    required double size, required Color color, required double opacity,
    required int duration, bool center = false,
  }) {
    Widget orb = Container(
      width: size, height: size,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: color.withOpacity(opacity),
        boxShadow: [BoxShadow(color: color.withOpacity(opacity), blurRadius: size * 0.8, spreadRadius: size * 0.1)],
      ),
    ).animate(onPlay: (c) => c.repeat(reverse: true))
      .fade(duration: Duration(seconds: duration), begin: 0.4, end: 1.0);

    return Positioned(
      top: center ? MediaQuery.of(context).size.height * 0.4 : top,
      bottom: bottom,
      left: left,
      right: right,
      child: orb,
    );
  }

  Future<void> _downloadCV() async {
    final now = DateTime.now();
    final ts = '${now.year}-${now.month.toString().padLeft(2, '0')}-${now.day.toString().padLeft(2, '0')}_${now.hour.toString().padLeft(2, '0')}${now.minute.toString().padLeft(2, '0')}${now.second.toString().padLeft(2, '0')}';
    downloadFile('assets/Nidheesh_Krishna_CV.pdf', 'Nidheesh_Krishna_CV_$ts.pdf');
  }
}

// ─────────────────────────────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────────────────────────────
class _Header extends StatelessWidget {
  final VoidCallback onEmail;
  final VoidCallback onDownloadCV;
  const _Header({required this.onEmail, required this.onDownloadCV});

  @override
  Widget build(BuildContext context) {
    final isMobile = MediaQuery.of(context).size.width < 768;
    return ClipRect(
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
        child: Container(
          decoration: BoxDecoration(
            color: AppColors.bgCard.withOpacity(0.9),
            border: Border(bottom: BorderSide(color: Colors.white.withOpacity(0.06))),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 24),
          height: 80,
          child: Row(
            children: [
              // Avatar + name
              Container(
                width: 42, height: 42,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  gradient: const LinearGradient(colors: [AppColors.gold600, AppColors.gold300]),
                ),
                padding: const EdgeInsets.all(1.5),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: Image.asset('assets/nidheesh.jpeg', fit: BoxFit.cover),
                ),
              ),
              const SizedBox(width: 12),
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('NIDHEESH KRISHNA N', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 13), fontWeight: FontWeight.bold, color: Colors.white, letterSpacing: 1.2)),
                  Text('SENIOR FLUTTER ARCHITECT & DEV', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 9), color: AppColors.gold400, letterSpacing: 2.0)),
                ],
              ),
              const Spacer(),
              if (!isMobile) ...[
                _headerLink(Icons.email, 'nidheeshkrishnap@outlook.com', onEmail),
                const SizedBox(width: 20),
                _headerLink(Icons.phone, '+91 9946185174', () => launchUrl(Uri.parse('tel:+919946185174'))),
                const SizedBox(width: 20),
                GestureDetector(
                  onTap: () => launchUrl(Uri.parse('https://linkedin.com/in/nidheesh-krishna-n-6a141315a')),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 7),
                    decoration: BoxDecoration(color: AppColors.bgInput, borderRadius: BorderRadius.circular(20), border: Border.all(color: Colors.grey[900]!)),
                    child: Row(children: [
                      const Icon(Icons.link, color: AppColors.gold400, size: 14),
                      const SizedBox(width: 6),
                      Text('LinkedIn Profile', style: GoogleFonts.inter(fontSize: rfs(context, 12), color: Colors.grey[400])),
                    ]),
                  ),
                ),
                const SizedBox(width: 16),
                GestureDetector(
                  onTap: onDownloadCV,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(colors: [AppColors.gold300, AppColors.gold400, AppColors.gold500]),
                      borderRadius: BorderRadius.circular(24),
                    ),
                    child: Row(children: [
                      const Icon(Icons.download, color: Colors.black, size: 14),
                      const SizedBox(width: 6),
                      Text('DOWNLOAD', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 10), fontWeight: FontWeight.bold, color: Colors.black)),
                    ]),
                  ),
                ).animate(onPlay: (c) => c.repeat(reverse: true)).scale(begin: const Offset(1,1), end: const Offset(1.02, 1.02), duration: 1.2.seconds),
              ] else ...[
                GestureDetector(
                  onTap: onDownloadCV,
                  child: Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(gradient: const LinearGradient(colors: [AppColors.gold400, AppColors.gold600]), borderRadius: BorderRadius.circular(12)),
                    child: const Icon(Icons.download, color: Colors.black, size: 18),
                  ),
                ),
                const SizedBox(width: 8),
                GestureDetector(
                  onTap: onEmail,
                  child: Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(color: AppColors.bgInput, border: Border.all(color: AppColors.gold500.withOpacity(0.1)), borderRadius: BorderRadius.circular(12)),
                    child: const Icon(Icons.email, color: AppColors.gold400, size: 18),
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Widget _headerLink(IconData icon, String label, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Row(children: [
        Icon(icon, color: AppColors.gold400, size: 14),
        const SizedBox(width: 6),
        Text(label, style: GoogleFonts.inter(fontSize: 12, color: Colors.grey[400])),
      ]),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────────────────
class _HeroSection extends StatelessWidget {
  final VoidCallback onMeetTap;
  final bool isMeetOpen;
  final VoidCallback onCloseMeet;
  final VoidCallback onEmail;

  const _HeroSection({required this.onMeetTap, required this.isMeetOpen, required this.onCloseMeet, required this.onEmail});

  @override
  Widget build(BuildContext context) {
    final w = MediaQuery.of(context).size.width;
    final isMobile = w < 768;

    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF07080c).withOpacity(0.6),
        border: Border.all(color: const Color(0xFF1b1c2b).withOpacity(0.5)),
        borderRadius: BorderRadius.circular(isMobile ? 20 : 28),
      ),
      padding: EdgeInsets.all(isMobile ? 20 : 32),
      child: isMobile
          ? Column(children: [_buildAvatar(), const SizedBox(height: 24), _buildHeroText(context)])
          : Row(crossAxisAlignment: CrossAxisAlignment.center, children: [
              Expanded(flex: 8, child: _buildHeroText(context)),
              const SizedBox(width: 32),
              _buildAvatar(),
            ]),
    );
  }

  Widget _buildAvatar() {
    return Container(
      width: 176, height: 176,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        gradient: const LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: [AppColors.gold600, AppColors.luxuryBorder, AppColors.gold300]),
      ),
      padding: const EdgeInsets.all(4),
      child: Stack(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(20),
            child: SizedBox.expand(child: Image.asset('assets/nidheesh.jpeg', fit: BoxFit.cover)),
          ),
          // Pulsing glow
          Container(decoration: BoxDecoration(borderRadius: BorderRadius.circular(20), gradient: RadialGradient(colors: [AppColors.gold500.withOpacity(0.25), Colors.transparent]))),
          // Badge
          Positioned(
            bottom: 10, left: 10, right: 10,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  decoration: BoxDecoration(color: Colors.black.withOpacity(0.6), borderRadius: BorderRadius.circular(12), border: Border.all(color: Colors.white.withOpacity(0.05))),
                  child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                    Text('NIDHEESH', style: GoogleFonts.jetBrainsMono(color: AppColors.gold400, fontSize: 9, fontWeight: FontWeight.bold, letterSpacing: 1)),
                    Row(children: [
                      Container(width: 6, height: 6, decoration: const BoxDecoration(color: AppColors.emerald400, shape: BoxShape.circle))
                          .animate(onPlay: (c) => c.repeat()).fadeIn(duration: 500.ms).then().fadeOut(duration: 500.ms),
                      const SizedBox(width: 4),
                      Text('ACTIVE', style: GoogleFonts.jetBrainsMono(color: AppColors.emerald400, fontSize: 9, fontWeight: FontWeight.bold)),
                    ]),
                  ]),
                ),
              ),
            ),
          ),
        ],
      ),
    ).animate(onPlay: (c) => c.repeat(reverse: true)).scale(begin: const Offset(1,1), end: const Offset(1.015,1.015), duration: 4.seconds, curve: Curves.easeInOut);
  }

  Widget _buildHeroText(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Badge chip
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 7),
          decoration: BoxDecoration(
            gradient: const LinearGradient(colors: [Color(0x66c9a244), Color(0xFF12131c)]),
            border: Border.all(color: AppColors.gold500.withOpacity(0.25)),
            borderRadius: BorderRadius.circular(20),
          ),
          child: Row(mainAxisSize: MainAxisSize.min, children: [
            const Icon(Icons.auto_awesome, color: AppColors.gold400, size: 14),
            const SizedBox(width: 8),
            Text('SIGNATURE FLUTTER MASTERPIECE PORTFOLIO', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 10), fontWeight: FontWeight.bold, color: AppColors.gold400, letterSpacing: 1.2)),
          ]),
        ).animate().fadeIn(duration: 400.ms).slideY(begin: 0.3, curve: Curves.easeOut),
        const SizedBox(height: 20),
        // Headline with gold gradient
        _GradientText('Crafting Premium\nMobile Masterpieces',
          gradient: const LinearGradient(colors: [Colors.white, Colors.white]),
          style: GoogleFonts.playfairDisplay(fontSize: rfs(context, 42), fontWeight: FontWeight.w600, height: 1.12, color: Colors.white),
        ).animate(delay: 100.ms).fadeIn(duration: 600.ms).slideX(begin: -0.05),
        const SizedBox(height: 12),
        Text(
          'Expert Flutter Developer with 5+ years of mobile application engineering experience. Dedicated to architecting robust cross-platform applications featuring secure automated reciprocal workflows, high-precision performance optimizations, and native biometric security.',
          style: GoogleFonts.inter(fontSize: rfs(context, 14), color: Colors.grey[400], height: 1.6),
        ).animate(delay: 200.ms).fadeIn(duration: 600.ms),
        const SizedBox(height: 20),
        // Stat badges
        Row(children: [
          _StatBadge('Experience', '5+ Yrs Flutter'),
          const SizedBox(width: 10),
          _StatBadge('Live Stores', '12+ Apps'),
          const SizedBox(width: 10),
          _StatBadge('Performance', '120Hz Fluent'),
        ]).animate(delay: 300.ms).fadeIn(duration: 600.ms).slideY(begin: 0.2),
        const SizedBox(height: 24),
        // Buttons
        Wrap(spacing: 12, runSpacing: 10, children: [
          // Meet button
          GestureDetector(
            onTap: onMeetTap,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              decoration: BoxDecoration(
                gradient: const LinearGradient(colors: [AppColors.gold300, AppColors.gold500]),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(mainAxisSize: MainAxisSize.min, children: [
                const Icon(Icons.videocam, color: Colors.black, size: 16),
                const SizedBox(width: 8),
                Text('SCHEDULE / START MEET', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 10), fontWeight: FontWeight.bold, color: Colors.black, letterSpacing: 1)),
                const SizedBox(width: 4),
                Icon(isMeetOpen ? Icons.expand_less : Icons.expand_more, color: Colors.black, size: 16),
              ]),
            ),
          ),
          // Email button
          GestureDetector(
            onTap: onEmail,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              decoration: BoxDecoration(
                color: const Color(0xFF0f1118).withOpacity(0.8),
                border: Border.all(color: AppColors.gold500.withOpacity(0.2)),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(mainAxisSize: MainAxisSize.min, children: [
                const Icon(Icons.mail_outline, color: AppColors.gold400, size: 16),
                const SizedBox(width: 8),
                Text('SEND EMAIL', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 10), fontWeight: FontWeight.bold, color: AppColors.gold300, letterSpacing: 1)),
              ]),
            ),
          ),
        ]).animate(delay: 400.ms).fadeIn(duration: 600.ms).slideY(begin: 0.3),
        // Meet Dropdown
        if (isMeetOpen) ...[
          const SizedBox(height: 12),
          _MeetDropdown(onClose: onCloseMeet),
        ],
      ],
    );
  }
}

class _StatBadge extends StatelessWidget {
  final String label;
  final String value;
  const _StatBadge(this.label, this.value);
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.luxuryCard,
        border: Border.all(color: Colors.grey[900]!),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(children: [
        Text(label.toUpperCase(), style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 9), color: Colors.grey[500])),
        const SizedBox(height: 4),
        Text(value, style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 11), fontWeight: FontWeight.bold, color: AppColors.gold400)),
      ]),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────
// MEET DROPDOWN
// ─────────────────────────────────────────────────────────────────────
class _MeetDropdown extends StatelessWidget {
  final VoidCallback onClose;
  const _MeetDropdown({required this.onClose});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 320,
      decoration: BoxDecoration(
        color: const Color(0xFF0b0c11),
        border: Border.all(color: AppColors.gold500.withOpacity(0.25)),
        borderRadius: BorderRadius.circular(20),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.5), blurRadius: 30)],
      ),
      padding: const EdgeInsets.all(16),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text('INSTANT DISPATCH HUB', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 9), fontWeight: FontWeight.bold, color: AppColors.gold400, letterSpacing: 1.5)),
        const SizedBox(height: 4),
        Text("Initialize meet or schedule with Nidheesh's official profiles.", style: GoogleFonts.inter(fontSize: rfs(context, 11), color: Colors.grey[400])),
        Divider(color: Colors.grey[900], height: 20),
        // Teams card
        Container(
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(color: AppColors.bgInput, border: Border.all(color: Colors.grey[900]!), borderRadius: BorderRadius.circular(12)),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
              Row(children: [
                Container(width: 6, height: 6, decoration: const BoxDecoration(color: AppColors.teamsBlue, shape: BoxShape.circle)),
                const SizedBox(width: 6),
                Text('MICROSOFT TEAMS', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 9), fontWeight: FontWeight.bold, color: AppColors.teamsBlue, letterSpacing: 1)),
              ]),
              Text('nidheeshkrishnap@outlook.com', style: GoogleFonts.inter(fontSize: rfs(context, 8), color: Colors.grey[600])),
            ]),
            const SizedBox(height: 8),
            Row(children: [
              Expanded(child: _MeetBtn('Schedule', AppColors.bgCard2, AppColors.teamsLight, border: AppColors.teamsBlue.withOpacity(0.15), url: 'https://teams.microsoft.com/l/meeting/new?subject=Interview%20with%20Nidheesh%20Krishna%20N&attendees=nidheeshkrishnap@outlook.com')),
              const SizedBox(width: 8),
              Expanded(child: _MeetBtn('Open Teams', AppColors.teamsBlue, Colors.white, url: 'https://teams.microsoft.com/l/call/new?users=nidheeshkrishnap@outlook.com')),
            ]),
          ]),
        ),
      ]),
    ).animate().fadeIn(duration: 200.ms).scale(begin: const Offset(0.95, 0.95), curve: Curves.easeOut);
  }
}

class _MeetBtn extends StatelessWidget {
  final String label;
  final Color bg;
  final Color fg;
  final Color? border;
  final String url;
  const _MeetBtn(this.label, this.bg, this.fg, {this.border, required this.url});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => launchUrl(Uri.parse(url), mode: LaunchMode.externalApplication),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 8),
        decoration: BoxDecoration(
          color: bg,
          border: border != null ? Border.all(color: border!) : null,
          borderRadius: BorderRadius.circular(10),
        ),
        child: Text(label, textAlign: TextAlign.center, style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 10), fontWeight: FontWeight.bold, color: fg)),
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────
// WORKSPACE SECTION (tabs)
// ─────────────────────────────────────────────────────────────────────
class _WorkspaceSection extends StatelessWidget {
  final String activeTab;
  final Function(String) onTabChanged;
  final String selectedProjectId;
  final Function(String) onProjectChanged;
  const _WorkspaceSection({required this.activeTab, required this.onTabChanged, required this.selectedProjectId, required this.onProjectChanged});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.bgCard.withOpacity(0.4),
        border: Border.all(color: const Color(0xFF1b1c2b).withOpacity(0.3)),
        borderRadius: BorderRadius.circular(24),
      ),
      padding: const EdgeInsets.all(24),
      child: Column(children: [
        // Tabs row
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(children: [
            _Tab('1. 6 Mobile Masterpieces Explorer', 'architecture', activeTab, onTabChanged),
            const SizedBox(width: 24),
            _Tab('2. Full Career Experience Timeline', 'resume', activeTab, onTabChanged),
            const SizedBox(width: 24),
            _Tab('3. Interactive AI Chat', 'copilot', activeTab, onTabChanged),
          ]),
        ),
        Divider(color: const Color(0xFF1b1c2b), height: 1),
        const SizedBox(height: 24),
        // Tab content
        AnimatedSwitcher(
          duration: const Duration(milliseconds: 250),
          child: _buildContent(),
        ),
      ]),
    );
  }

  Widget _buildContent() {
    switch (activeTab) {
      case 'architecture':
        return _ProjectExplorer(selectedProjectId: selectedProjectId, onProjectChanged: onProjectChanged, key: const ValueKey('arch'));
      case 'resume':
        return const _ResumeTab(key: ValueKey('resume'));
      case 'copilot':
        return const _CopilotTab(key: ValueKey('copilot'));
      default:
        return const SizedBox(key: ValueKey('none'));
    }
  }
}

class _Tab extends StatelessWidget {
  final String label;
  final String id;
  final String active;
  final Function(String) onTap;
  const _Tab(this.label, this.id, this.active, this.onTap);

  @override
  Widget build(BuildContext context) {
    final isActive = active == id;
    return GestureDetector(
      onTap: () => onTap(id),
      child: Container(
        padding: const EdgeInsets.only(bottom: 12),
        decoration: BoxDecoration(border: Border(bottom: BorderSide(
          color: isActive ? AppColors.gold400 : Colors.transparent, width: 2.5,
        ))),
        child: Text(
          label.toUpperCase(),
          style: GoogleFonts.jetBrainsMono(
            fontSize: rfs(context, 10),
            fontWeight: isActive ? FontWeight.bold : FontWeight.normal,
            color: isActive ? AppColors.gold300 : Colors.grey[600],
            letterSpacing: 0.8,
          ),
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────
// PROJECT EXPLORER TAB
// ─────────────────────────────────────────────────────────────────────
class _ProjectExplorer extends StatelessWidget {
  final String selectedProjectId;
  final Function(String) onProjectChanged;
  const _ProjectExplorer({required this.selectedProjectId, required this.onProjectChanged, super.key});

  @override
  Widget build(BuildContext context) {
    final project = kProjects.firstWhere((p) => p.id == selectedProjectId, orElse: () => kProjects[0]);
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Text('SELECT ANY APP BELOW TO EXPLORE SPECIFICATIONS & ARCHITECTURE:', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 10), fontWeight: FontWeight.bold, color: AppColors.gold400, letterSpacing: 1)),
      const SizedBox(height: 4),
      Text('${project.title}: ', style: GoogleFonts.playfairDisplay(fontSize: rfs(context, 22), fontWeight: FontWeight.w500, color: Colors.white))
        ..createChild(Text(project.subtitle, style: GoogleFonts.playfairDisplay(fontSize: rfs(context, 22), color: AppColors.gold400))),
      const SizedBox(height: 20),
      // Project grid
      LayoutBuilder(builder: (context, constraints) {
        final cols = constraints.maxWidth > 500 ? 3 : 2;
        final double itemWidth = (constraints.maxWidth - (cols - 1) * 10) / cols;
        final double ratio = itemWidth / 76;
        return GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: cols,
            mainAxisSpacing: 10,
            crossAxisSpacing: 10,
            childAspectRatio: ratio,
          ),
          itemCount: kProjects.length,
          itemBuilder: (ctx, i) => _ProjectCard(project: kProjects[i], isSelected: kProjects[i].id == selectedProjectId, onTap: () => onProjectChanged(kProjects[i].id)),
        );
      }),
      const SizedBox(height: 20),
      // Selected project detail
      AnimatedSwitcher(
        duration: const Duration(milliseconds: 250),
        child: _ProjectDetail(project: project, key: ValueKey(selectedProjectId)),
      ),
    ]);
  }
}

extension on Text {
  Widget createChild(Text child) => RichText(text: TextSpan(text: data, style: style, children: [TextSpan(text: child.data, style: child.style)]));
}

class _ProjectCard extends StatefulWidget {
  final Project project;
  final bool isSelected;
  final VoidCallback onTap;
  const _ProjectCard({required this.project, required this.isSelected, required this.onTap});

  @override
  State<_ProjectCard> createState() => _ProjectCardState();
}

class _ProjectCardState extends State<_ProjectCard> {
  bool _hovering = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _hovering = true),
      onExit: (_) => setState(() => _hovering = false),
      child: GestureDetector(
        onTap: widget.onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: widget.isSelected ? const Color(0xFF141622) : const Color(0xFF0b0c11),
            border: Border.all(color: widget.isSelected ? AppColors.gold400.withOpacity(0.8) : _hovering ? Colors.grey[800]! : Colors.grey[900]!),
            borderRadius: BorderRadius.circular(16),
            boxShadow: widget.isSelected ? [BoxShadow(color: AppColors.gold500.withOpacity(0.12), blurRadius: 20)] : [],
          ),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
            Row(children: [
              Container(
                padding: const EdgeInsets.all(6),
                decoration: BoxDecoration(color: widget.isSelected ? AppColors.gold500.withOpacity(0.1) : Colors.grey[950], borderRadius: BorderRadius.circular(8)),
                child: Icon(_getIcon(widget.project.iconType), color: _getColor(widget.project.iconType), size: 16),
              ),
              const SizedBox(width: 8),
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(widget.project.title, style: TextStyle(fontWeight: FontWeight.bold, fontSize: rfs(context, 12), color: widget.isSelected ? AppColors.gold300 : Colors.white), maxLines: 1, overflow: TextOverflow.ellipsis),
                Text(widget.project.category.toUpperCase(), style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 8), color: Colors.grey[600])),
              ])),
            ]),
            Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
              Text('★ ${widget.project.rating.toStringAsFixed(1)}', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 9), color: Colors.grey[600])),
              Container(padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2), decoration: BoxDecoration(color: Colors.grey[950], borderRadius: BorderRadius.circular(4)), child: Text('${widget.project.installs} DL', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 9), color: Colors.grey[400]))),
            ]),
          ]),
        ),
      ),
    );
  }

  IconData _getIcon(String type) {
    switch (type) {
      case 'fresh': return Icons.shopping_cart;
      case 'milk': return Icons.calendar_month;
      case 'quiz': return Icons.emoji_events;
      case 'equalplus': return Icons.print;
      case 'meditation': return Icons.favorite;
      case 'fizzmo': return Icons.auto_awesome;
      default: return Icons.explore;
    }
  }

  Color _getColor(String type) {
    switch (type) {
      case 'fresh': return const Color(0xFF34d399);
      case 'milk': return const Color(0xFF22d3ee);
      case 'quiz': return const Color(0xFFfb923c);
      case 'equalplus': return const Color(0xFFfbbf24);
      case 'meditation': return const Color(0xFFa78bfa);
      case 'fizzmo': return const Color(0xFFfb7185);
      default: return AppColors.gold400;
    }
  }
}

class _ProjectDetail extends StatelessWidget {
  final Project project;
  const _ProjectDetail({required this.project, super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF0c0d12).withOpacity(0.9),
        border: Border.all(color: AppColors.gold500.withOpacity(0.2)),
        borderRadius: BorderRadius.circular(16),
      ),
      padding: const EdgeInsets.all(20),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
          Text(project.title, style: GoogleFonts.playfairDisplay(fontSize: rfs(context, 16), fontWeight: FontWeight.w600, color: Colors.white)),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(color: AppColors.bgInput, border: Border.all(color: Colors.grey[800]!), borderRadius: BorderRadius.circular(8)),
            child: Text('★ ${project.rating} (${project.installs} installs)', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 10), color: Colors.grey[500])),
          ),
        ]),
        const SizedBox(height: 12),
        Text(project.description, style: GoogleFonts.inter(fontSize: rfs(context, 12), color: Colors.grey[400], height: 1.5)),
        const SizedBox(height: 16),
        Text('ENGINE STACK UTILIZED:', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 9), color: Colors.grey[600], letterSpacing: 1)),
        const SizedBox(height: 8),
        Wrap(spacing: 6, runSpacing: 6, children: project.technologies.map((t) => Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
          decoration: BoxDecoration(color: const Color(0xFF121319), border: Border.all(color: AppColors.gold400.withOpacity(0.1)), borderRadius: BorderRadius.circular(8)),
          child: Text(t, style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 10), color: AppColors.gold300)),
        )).toList()),
        const SizedBox(height: 16),
        Text('SIGNATURE PERFORMANCE ACHIEVEMENTS:', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 9), color: Colors.grey[600], letterSpacing: 1)),
        const SizedBox(height: 8),
        LayoutBuilder(builder: (ctx, constraints) {
          final twoCol = constraints.maxWidth > 500;
          return Wrap(spacing: 8, runSpacing: 8, children: project.features.map((f) => SizedBox(
            width: twoCol ? (constraints.maxWidth / 2 - 8) : constraints.maxWidth,
            child: Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(color: AppColors.luxuryCard.withOpacity(0.8), border: Border.all(color: Colors.grey[900]!), borderRadius: BorderRadius.circular(12)),
              child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
                const Icon(Icons.check_circle, color: AppColors.gold400, size: 14),
                const SizedBox(width: 8),
                Expanded(child: Text(f, style: GoogleFonts.inter(fontSize: rfs(ctx, 11), color: Colors.grey[400], height: 1.4))),
              ]),
            ),
          )).toList());
        }),
      ]),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────
// RESUME / TIMELINE TAB
// ─────────────────────────────────────────────────────────────────────
class _ResumeTab extends StatefulWidget {
  const _ResumeTab({super.key});
  @override
  State<_ResumeTab> createState() => _ResumeTabState();
}

class _ResumeTabState extends State<_ResumeTab> {
  String expandedJob = 'aventus';

  @override
  Widget build(BuildContext context) {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      // Skills grid
      Container(
        decoration: BoxDecoration(color: const Color(0xFF0b0c11), border: Border.all(color: const Color(0xFF1d1f2b)), borderRadius: BorderRadius.circular(20)),
        padding: const EdgeInsets.all(20),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text('SKILLS ECOSYSTEM', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 10), fontWeight: FontWeight.bold, color: AppColors.gold400, letterSpacing: 2)),
          const SizedBox(height: 12),
          LayoutBuilder(builder: (ctx, constraints) {
            final cols = constraints.maxWidth > 500 ? 3 : 2;
            return GridView.count(
              crossAxisCount: cols, shrinkWrap: true, physics: const NeverScrollableScrollPhysics(),
              mainAxisSpacing: 10, crossAxisSpacing: 10, childAspectRatio: 1.8,
              children: [
                _SkillCard('Frameworks', 'Flutter Specialist (4+ yrs)', 'Android SDK, Native iOS wrappers, Dart VM internals.'),
                _SkillCard('Languages', 'Dart & Java', 'Object-oriented programming, async event loops, serialization.'),
                _SkillCard('State Management', 'Provider, Riverpod, Bloc', 'Custom selectors, stream controllers, actions, and store hooks.', gold: true),
              ],
            );
          }),
        ]),
      ),
      const SizedBox(height: 20),
      Text('PROFESSIONAL EXPERIENCE', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 10), fontWeight: FontWeight.bold, color: AppColors.gold400, letterSpacing: 2)),
      const SizedBox(height: 12),
      ...kJobs.map((job) => Padding(
        padding: const EdgeInsets.only(bottom: 10),
        child: _JobAccordion(job: job, isExpanded: expandedJob == job.id, onToggle: () => setState(() => expandedJob = expandedJob == job.id ? '' : job.id)),
      )),
      const SizedBox(height: 20),
      // Education + pitch
      LayoutBuilder(builder: (ctx, constraints) {
        final twoCol = constraints.maxWidth > 500;
        if (twoCol) {
          return Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Expanded(child: _EducationCard()),
            const SizedBox(width: 16),
            Expanded(child: _PitchCard()),
          ]);
        } else {
          return Column(children: [_EducationCard(), const SizedBox(height: 12), _PitchCard()]);
        }
      }),
    ]);
  }
}

class _SkillCard extends StatelessWidget {
  final String label;
  final String title;
  final String desc;
  final bool gold;
  const _SkillCard(this.label, this.title, this.desc, {this.gold = false});
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(color: const Color(0xFF10121d), border: Border.all(color: Colors.grey[900]!), borderRadius: BorderRadius.circular(16)),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisAlignment: MainAxisAlignment.spaceEvenly, children: [
        Text(label.toUpperCase(), style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 9), color: Colors.grey[600])),
        Text(title, style: GoogleFonts.inter(fontSize: rfs(context, 12), fontWeight: FontWeight.w600, color: gold ? AppColors.gold300 : Colors.white)),
        Text(desc, style: GoogleFonts.inter(fontSize: rfs(context, 10), color: Colors.grey[500]), maxLines: 2, overflow: TextOverflow.ellipsis),
      ]),
    );
  }
}

class _JobAccordion extends StatelessWidget {
  final Job job;
  final bool isExpanded;
  final VoidCallback onToggle;
  const _JobAccordion({required this.job, required this.isExpanded, required this.onToggle});

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      decoration: BoxDecoration(
        color: isExpanded ? const Color(0xFF0d0e15) : const Color(0xFF0c0d12),
        border: Border.all(color: isExpanded ? AppColors.gold400 : const Color(0xFF1e202b)),
        borderRadius: BorderRadius.circular(16),
      ),
      clipBehavior: Clip.hardEdge,
      child: Column(children: [
        GestureDetector(
          onTap: onToggle,
          child: Container(
            padding: const EdgeInsets.all(16),
            color: Colors.transparent,
            child: Row(children: [
              Container(
                width: 40, height: 40,
                decoration: BoxDecoration(color: const Color(0xFF161722), border: Border.all(color: AppColors.gold400.withOpacity(0.15)), borderRadius: BorderRadius.circular(12)),
                child: const Icon(Icons.work_outline, color: AppColors.gold400, size: 18),
              ),
              const SizedBox(width: 14),
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(job.role, style: GoogleFonts.playfairDisplay(fontSize: rfs(context, 14), fontWeight: FontWeight.w600, color: Colors.white)),
                const SizedBox(height: 2),
                Row(children: [
                  Text(job.company, style: GoogleFonts.inter(fontSize: rfs(context, 12), color: AppColors.gold300, fontWeight: FontWeight.w500)),
                  Text(' • ', style: TextStyle(color: Colors.grey[700])),
                  const Icon(Icons.calendar_today, size: 11, color: Colors.grey),
                  const SizedBox(width: 2),
                  Flexible(child: Text(job.period, style: GoogleFonts.inter(fontSize: rfs(context, 11), color: Colors.grey[500]), overflow: TextOverflow.ellipsis)),
                ]),
              ])),
              Icon(isExpanded ? Icons.expand_less : Icons.expand_more, color: isExpanded ? AppColors.gold400 : Colors.grey[600]),
            ]),
          ),
        ),
        if (isExpanded) ...[
          Divider(color: const Color(0xFF1e202b), height: 1),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text('CORE CONTRIBUTIONS', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 9), color: Colors.grey[600], letterSpacing: 1)),
              const SizedBox(height: 8),
              ...job.bullets.map((b) => Padding(
                padding: const EdgeInsets.only(bottom: 6),
                child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  const Icon(Icons.check_circle, color: AppColors.gold400, size: 14),
                  const SizedBox(width: 8),
                  Expanded(child: Text(b, style: GoogleFonts.inter(fontSize: rfs(context, 12), color: Colors.grey[300], height: 1.4))),
                ]),
              )),
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(color: const Color(0xFF08090e), border: Border.all(color: Colors.grey[900]!), borderRadius: BorderRadius.circular(12)),
                child: Row(mainAxisAlignment: MainAxisAlignment.spaceAround, children: job.metrics.map((m) => Column(children: [
                  Text(m['label']!, style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 9), color: Colors.grey[700])),
                  const SizedBox(height: 4),
                  Text(m['value']!, style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 11), fontWeight: FontWeight.bold, color: Colors.white)),
                ])).toList()),
              ),
              const SizedBox(height: 10),
              Wrap(spacing: 6, runSpacing: 6, children: job.techUsed.map((t) => Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                decoration: BoxDecoration(color: const Color(0xFF141622), border: Border.all(color: AppColors.gold400.withOpacity(0.1)), borderRadius: BorderRadius.circular(8)),
                child: Text(t, style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 10), color: AppColors.gold300)),
              )).toList()),
            ]),
          ),
        ],
      ]),
    );
  }
}

class _EducationCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(color: const Color(0xFF0b0c11), border: Border.all(color: const Color(0xFF1d1f2b)), borderRadius: BorderRadius.circular(16)),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [const Icon(Icons.school, color: AppColors.gold400, size: 18), const SizedBox(width: 8), Text('Education Milestones', style: GoogleFonts.playfairDisplay(fontSize: rfs(context, 13), fontWeight: FontWeight.w600, color: Colors.white))]),
        const SizedBox(height: 14),
        _EduItem('Master of Computer Applications (MCA)', 'Bharathiar University, Coimbatore', 'Graduated: 2012 – 2015'),
        const SizedBox(height: 10),
        _EduItem('Bachelor of Computer Applications (BCA)', 'Bharathiar University, Coimbatore', 'Graduated: 2009 – 2012'),
      ]),
    );
  }
}

class _EduItem extends StatelessWidget {
  final String title;
  final String school;
  final String period;
  const _EduItem(this.title, this.school, this.period);
  @override
  Widget build(BuildContext context) {
    return Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Container(width: 2, height: 60, color: AppColors.gold500.withOpacity(0.3)),
      const SizedBox(width: 12),
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(title, style: GoogleFonts.inter(fontSize: rfs(context, 12), fontWeight: FontWeight.w600, color: Colors.white)),
        Text(school, style: GoogleFonts.inter(fontSize: rfs(context, 11), color: Colors.grey[400])),
        Text(period, style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 10), color: AppColors.gold300)),
      ]),
    ]);
  }
}

class _PitchCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(color: const Color(0xFF0b0c11), border: Border.all(color: const Color(0xFF1d1f2b)), borderRadius: BorderRadius.circular(16)),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
        Row(children: [const Icon(Icons.emoji_events, color: AppColors.gold400, size: 18), const SizedBox(width: 8), Text('Professional Pitch', style: GoogleFonts.playfairDisplay(fontSize: rfs(context, 13), fontWeight: FontWeight.w600, color: Colors.white))]),
        const SizedBox(height: 10),
        Text('"Over the past 5 years, I\'ve dedicated my craft to writing clean, reliable dart repositories that scale cleanly from individual single-view clients to multi-tenant ecosystems. Crafting high-fidelity mockups of premium elite clubs is my signature."', style: GoogleFonts.inter(fontSize: rfs(context, 12), color: Colors.grey[400], height: 1.5, fontStyle: FontStyle.italic)),
        const SizedBox(height: 10),
        Align(alignment: Alignment.centerRight, child: Text('Available for Senior / Lead Flutter roles worldwide.', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 9), color: Colors.grey[600]))),
      ]),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────
// COPILOT TAB (placeholder — AI requires backend)
// ─────────────────────────────────────────────────────────────────────
class _CopilotTab extends StatelessWidget {
  const _CopilotTab({super.key});
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(color: const Color(0xFF0b0c11), border: Border.all(color: const Color(0xFF1b1c2b)), borderRadius: BorderRadius.circular(16)),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text('INTERACTIVE PORTFOLIO COPILOT', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 10), fontWeight: FontWeight.bold, color: AppColors.gold400, letterSpacing: 1.5)),
        const SizedBox(height: 4),
        Text('Interactive AI Chat', style: GoogleFonts.playfairDisplay(fontSize: rfs(context, 20), fontWeight: FontWeight.w500, color: Colors.white)),
        const SizedBox(height: 4),
        Text('Ask my customized Gemini virtual assistant any direct questions regarding my MCA, Flutter state selectors, cross-platform performance practices, or mobile achievements.', style: GoogleFonts.inter(fontSize: rfs(context, 12), color: Colors.grey[400])),
        const SizedBox(height: 20),
        Row(children: [
          Container(width: 6, height: 6, decoration: const BoxDecoration(color: AppColors.gold400, shape: BoxShape.circle))
              .animate(onPlay: (c) => c.repeat()).fadeIn(duration: 600.ms).then().fadeOut(duration: 600.ms),
          const SizedBox(width: 8),
          Text('INTERACTIVE GEMINI AI COPILOT', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 11), fontWeight: FontWeight.bold, color: Colors.grey[300])),
          const Spacer(),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(color: AppColors.gold500.withOpacity(0.1), border: Border.all(color: AppColors.gold400.withOpacity(0.1)), borderRadius: BorderRadius.circular(6)),
            child: Text('ACTIVE RESPONSE MODE', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 8), color: AppColors.gold400, letterSpacing: 1)),
          ),
        ]),
        Divider(color: Colors.grey[900], height: 24),
        Center(child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 32),
          child: Column(children: [
            const Icon(Icons.smart_toy_outlined, color: AppColors.gold400, size: 48),
            const SizedBox(height: 12),
            Text('AI Chat requires a backend server', style: GoogleFonts.inter(fontSize: rfs(context, 14), color: Colors.grey[500])),
            Text('Run the React + Node.js version to use Gemini AI', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 11), color: Colors.grey[700])),
          ]),
        )),
      ]),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────
class _Footer extends StatelessWidget {
  const _Footer();
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 40),
      decoration: BoxDecoration(border: Border(top: BorderSide(color: const Color(0xFF1b1c2b)))),
      child: Column(children: [
        Text('NIDHEESH KRISHNA N • EXCLUSIVE PORTFOLIO WORKSPACE', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 10), color: AppColors.gold400.withOpacity(0.8), letterSpacing: 2)),
        const SizedBox(height: 12),
        Wrap(spacing: 16, runSpacing: 8, alignment: WrapAlignment.center, children: [
          Text('Phone: +91 9946185174', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 10), color: Colors.grey[600])),
          Text('|', style: TextStyle(color: Colors.grey[800])),
          Text('Email: nidheeshkrishnap@outlook.com', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 10), color: Colors.grey[600])),
          Text('|', style: TextStyle(color: Colors.grey[800])),
          Text('LinkedIn: linkedin.com/in/nidheesh-krishna-n-6a141315a', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 10), color: Colors.grey[600])),
        ]),
        const SizedBox(height: 8),
        Text('Build completed using Flutter • Dart ', style: GoogleFonts.inter(fontSize: rfs(context, 10), color: Colors.grey[800])),
      ]),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────
// WHATSAPP BUTTON
// ─────────────────────────────────────────────────────────────────────
class _WhatsAppButton extends StatelessWidget {
  const _WhatsAppButton();
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => launchUrl(Uri.parse('https://wa.me/919946185174?text=Hi%20Nidheesh!%20I%20saw%20your%20awesome%20Flutter%20portfolio%20and%20wanted%20to%20connect.'), mode: LaunchMode.externalApplication),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          gradient: const LinearGradient(colors: [AppColors.emerald600, AppColors.emerald500]),
          border: Border.all(color: AppColors.emerald400.withOpacity(0.2)),
          borderRadius: BorderRadius.circular(30),
          boxShadow: [BoxShadow(color: const Color(0xFF064E3B).withOpacity(0.3), blurRadius: 20, offset: const Offset(0, 8))],
        ),
        child: Row(mainAxisSize: MainAxisSize.min, children: [
          Stack(children: [
            const Icon(Icons.chat_bubble, color: Colors.white, size: 16),
            Positioned(top: 0, right: 0, child: Container(width: 6, height: 6, decoration: const BoxDecoration(color: Color(0xFF6ee7b7), shape: BoxShape.circle))
                .animate(onPlay: (c) => c.repeat()).fadeIn(duration: 400.ms).then().fadeOut(duration: 400.ms)),
          ]),
          const SizedBox(width: 8),
          Text('MESSAGE NIDHEESH', style: GoogleFonts.jetBrainsMono(color: Colors.white, fontSize: rfs(context, 10), fontWeight: FontWeight.bold, letterSpacing: 1.2)),
        ]),
      ),
    ).animate(delay: 1.seconds).scale(curve: Curves.elasticOut, duration: 800.ms);
  }
}

// ─────────────────────────────────────────────────────────────────────
// EMAIL MODAL
// ─────────────────────────────────────────────────────────────────────
class _EmailModal extends StatefulWidget {
  final VoidCallback onClose;
  const _EmailModal({required this.onClose});
  @override
  State<_EmailModal> createState() => _EmailModalState();
}

class _EmailModalState extends State<_EmailModal> {
  final _nameCtrl = TextEditingController();
  final _emailCtrl = TextEditingController();
  final _subjectCtrl = TextEditingController();
  final _messageCtrl = TextEditingController();
  bool _sending = false;

  void _submit() async {
    if (_emailCtrl.text.isEmpty || _messageCtrl.text.isEmpty) return;
    setState(() => _sending = true);
    final subject = _subjectCtrl.text.isEmpty ? 'Collaboration Inquiry from ${_nameCtrl.text.isEmpty ? "Visitor" : _nameCtrl.text}' : _subjectCtrl.text;
    final body = 'Contact Request details:\n\nName: ${_nameCtrl.text.isEmpty ? "Not Specified" : _nameCtrl.text}\nEmail: ${_emailCtrl.text}\n\nMessage:\n${_messageCtrl.text}\n\n---\nSent from Nidheesh\'s Portfolio';
    final uri = Uri.parse('mailto:nidheeshkrishnap@outlook.com?subject=${Uri.encodeComponent(subject)}&body=${Uri.encodeComponent(body)}');
    if (await canLaunchUrl(uri)) await launchUrl(uri);
    await Future.delayed(const Duration(seconds: 1));
    setState(() => _sending = false);
    widget.onClose();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(children: [
      GestureDetector(onTap: widget.onClose, child: Container(color: Colors.black.withOpacity(0.85))),
      Center(child: SingleChildScrollView(child: Container(
        margin: const EdgeInsets.all(20),
        constraints: const BoxConstraints(maxWidth: 520),
        decoration: BoxDecoration(
          color: const Color(0xFF0b0c11),
          border: Border.all(color: AppColors.gold500.withOpacity(0.3)),
          borderRadius: BorderRadius.circular(28),
          boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.5), blurRadius: 40)],
        ),
        child: Stack(children: [
          // Top gold line
          Positioned(top: 0, left: 80, right: 80, child: Container(height: 1, decoration: const BoxDecoration(gradient: LinearGradient(colors: [Colors.transparent, AppColors.gold400, Colors.transparent])))),
          Padding(
            padding: const EdgeInsets.all(28),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text('IN-SITE MAIL FACILITY', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 9), fontWeight: FontWeight.bold, color: AppColors.gold400, letterSpacing: 1.5)),
                  const SizedBox(height: 4),
                  Row(children: [
                    const Icon(Icons.email, color: AppColors.gold400, size: 18),
                    const SizedBox(width: 8),
                    Text('Send Message to Nidheesh', style: GoogleFonts.playfairDisplay(fontSize: rfs(context, 20), fontWeight: FontWeight.w500, color: Colors.white)),
                  ]),
                  const SizedBox(height: 4),
                  Text('Formulate your collaboration proposal, technical job details, or interview coordinate links directly.', style: GoogleFonts.inter(fontSize: rfs(context, 12), color: Colors.grey[400])),
                ]),
                GestureDetector(
                  onTap: widget.onClose,
                  child: Container(padding: const EdgeInsets.all(6), decoration: BoxDecoration(shape: BoxShape.circle, border: Border.all(color: Colors.white.withOpacity(0.1))), child: const Icon(Icons.close, size: 18, color: Colors.grey)),
                ),
              ]),
              const SizedBox(height: 20),
              _field('YOUR NAME / ORGANIZATION', 'e.g. John Doe / Tech Corp', _nameCtrl),
              const SizedBox(height: 12),
              Row(children: [
                Expanded(child: _field('YOUR EMAIL ADDRESS *', 'e.g. client@domain.com', _emailCtrl, required: true)),
                const SizedBox(width: 12),
                Expanded(child: _field('INQUIRY SUBJECT', 'e.g. Mobile Developer Role', _subjectCtrl)),
              ]),
              const SizedBox(height: 12),
              _field('PROPOSALS & MESSAGE BODY *', 'Provide details about the stack involved, terms, expectations, or contact timings...', _messageCtrl, maxLines: 4, required: true),
              const SizedBox(height: 16),
              Row(children: [
                Expanded(child: GestureDetector(
                  onTap: _sending ? null : _submit,
                  child: Container(
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    decoration: BoxDecoration(gradient: const LinearGradient(colors: [AppColors.gold300, AppColors.gold400, AppColors.gold500]), borderRadius: BorderRadius.circular(14)),
                    child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                      const Icon(Icons.send, color: Colors.black, size: 14),
                      const SizedBox(width: 8),
                      Text(_sending ? 'OPENING MAIL CLIENT...' : 'LAUNCH NATIVE DISPATCH', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 10), fontWeight: FontWeight.bold, color: Colors.black)),
                    ]),
                  ),
                )),
                const SizedBox(width: 10),
                GestureDetector(
                  onTap: () {},
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                    decoration: BoxDecoration(color: AppColors.bgInput, border: Border.all(color: AppColors.gold500.withOpacity(0.15)), borderRadius: BorderRadius.circular(14)),
                    child: Text('Copy draft', style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 10), fontWeight: FontWeight.bold, color: AppColors.gold300)),
                  ),
                ),
              ]),
              const SizedBox(height: 8),
              Text('* Opens standard local client (Outlook, Mail, etc.) pre-filled.', textAlign: TextAlign.center, style: GoogleFonts.inter(fontSize: rfs(context, 10), color: Colors.grey[600])),
            ]),
          ),
        ]),
      ))).animate().fadeIn(duration: 200.ms).scale(begin: const Offset(0.95, 0.95)),
    ]);
  }

  Widget _field(String label, String hint, TextEditingController ctrl, {int maxLines = 1, bool required = false}) {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Text(label, style: GoogleFonts.jetBrainsMono(fontSize: rfs(context, 9), fontWeight: FontWeight.bold, color: AppColors.gold400.withOpacity(0.8), letterSpacing: 1)),
      const SizedBox(height: 6),
      TextField(
        controller: ctrl,
        maxLines: maxLines,
        style: GoogleFonts.inter(color: Colors.white, fontSize: rfs(context, 13)),
        decoration: InputDecoration(
          hintText: hint,
          hintStyle: GoogleFonts.inter(color: Colors.grey[700], fontSize: rfs(context, 12)),
          filled: true,
          fillColor: AppColors.bgInput,
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide(color: Colors.grey[900]!)),
          enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide(color: Colors.grey[900]!)),
          focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide(color: AppColors.gold500.withOpacity(0.4))),
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        ),
      ),
    ]);
  }
}

// ─────────────────────────────────────────────────────────────────────
// Gold gradient text helper
// ─────────────────────────────────────────────────────────────────────
class _GradientText extends StatelessWidget {
  final String text;
  final Gradient gradient;
  final TextStyle? style;
  const _GradientText(this.text, {required this.gradient, this.style});

  @override
  Widget build(BuildContext context) {
    return ShaderMask(
      blendMode: BlendMode.srcIn,
      shaderCallback: (bounds) => gradient.createShader(Rect.fromLTWH(0, 0, bounds.width, bounds.height)),
      child: Text(text, style: style),
    );
  }
}
