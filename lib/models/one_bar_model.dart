class OneBarModel {
  final DateTime inicio;
  final DateTime fin;
  OneBarModel(this.inicio, this.fin);

  double calcularProgreso() {
    final DateTime actual = DateTime.now();
    Duration diff = fin.difference(inicio);
    Duration transc = actual.difference(inicio);
    double porcentaje = transc.inMilliseconds / diff.inMilliseconds;
    return porcentaje;
  }
}