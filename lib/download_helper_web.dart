import 'dart:html' as html;

void downloadFile(String url, String filename) {
  final anchor = html.AnchorElement(href: url)
    ..setAttribute('download', filename);
  anchor.click();
}
