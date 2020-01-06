from django import forms
from .models import Contact

class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        widgets = {
          'feedback': forms.Textarea(attrs={'rows':4, 'cols':15}),
        }
        exclude = []
