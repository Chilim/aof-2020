import 'dart:io';

void main(List<String> args) {
  final lines = File('day-2/input.txt').readAsStringSync().split('\n');
  final puzzles = lines.map((p) => p.split(" ")).toList();
  final entries = puzzles
      .map((entry) => ({
            'repeat': entry[0].split('-').map(int.parse).toList(),
            'char': entry[1].replaceAll(':', ''),
            'password': entry[2],
          }))
      .toList();
}
