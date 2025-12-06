import 'package:flutter/material.dart';

class AddAccountForm extends StatefulWidget {
  final Function(String name)? onSubmit;

  const AddAccountForm({super.key, this.onSubmit});

  @override
  State<AddAccountForm> createState() => _AddAccountFormState();
}

class _AddAccountFormState extends State<AddAccountForm> {
  final GlobalKey<FormState> _formKey = GlobalKey();
  final TextEditingController _nameController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        spacing: 16,
        children: [
          TextFormField(
            controller: _nameController,
            decoration: InputDecoration(filled: true, label: Text("Name")),
            validator: (value) {
              if (value == null || value.isEmpty) return 'Please enter a name';
              return null;
            },
          ),
          ElevatedButton(
            style: ButtonStyle(
              minimumSize: WidgetStatePropertyAll(Size(0, 48)),
            ),
            onPressed: () => _handleAddAccount(context),
            child: Text("Submit"),
          ),
        ],
      ),
    );
  }

  void _handleAddAccount(BuildContext context) {
    if (_formKey.currentState == null) return;

    final form = _formKey.currentState!;
    final valid = form.validate();

    if (!valid) return;

    final name = _nameController.text;
    widget.onSubmit?.call(name);
  }
}
