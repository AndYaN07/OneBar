import 'package:flutter/material.dart';

void main() {
  runApp(const MainApp());
} //main

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
   return MaterialApp(
      debugShowCheckedModeBanner: false, // Quita la cinta roja de "Debug"
      title: 'OneBar',
      home: const PantallaPrincipal(), // Apunta a la pantalla principal
    );
  }
} //MainApp

// Mi pantalla principal:

class PantallaPrincipal extends StatelessWidget {
  const PantallaPrincipal({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: Text('Aquí irá OneBar'),
      ),
    );
  }
} //PantallaPrincipal
