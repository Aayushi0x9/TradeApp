import 'package:base_code/module/home/home_screen.dart';
import 'package:base_code/package/screen_packages.dart';
import 'package:flutter/material.dart';




class BottomBarScreen extends StatefulWidget {
  const BottomBarScreen({super.key});

  @override
  BottomBarScreenState createState() => BottomBarScreenState();
}

class BottomBarScreenState extends State<BottomBarScreen> {
  int _selectedIndex = 0;

  final List<Widget> _screens = [
    const HomeScreen(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_selectedIndex],
      bottomNavigationBar: Stack(
        alignment: Alignment.bottomCenter,
        children: [
          Container(
            height: 65,
            decoration: const BoxDecoration(
              color: Colors.white,
              // borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
              boxShadow: [
                BoxShadow(color: Colors.black12, blurRadius: 5, spreadRadius: 2),
              ],
            ),
          ),
          Positioned(
            bottom: 5, // Adjust height
            child: FloatingActionButton(
              backgroundColor: AppColor.primaryColor,
              onPressed: () {
                _onItemTapped(0);
              },
              shape: const CircleBorder(),
              child: const Icon(Icons.home, size: 30, color: AppColor.white),
            ),
          ),
        ],
      ),
    );
  }
}








