import 'dart:io';

void main(List<String> args) {
  final lines = File('day-1/puzzles.txt').readAsStringSync().split('\n');
  final puzzles = lines.map(int.parse).toList();
  final querySum = 2020;
  var answer;

  for (var i = 0; i < puzzles.length; i += 1) {
    for (var j = i + 1; j < puzzles.length; j += 1) {
      if (puzzles[i] + puzzles[j] == querySum) {
        answer = puzzles[i] * puzzles[j];
        break;
      }
      continue;
    }
  }

  print(answer);
}
