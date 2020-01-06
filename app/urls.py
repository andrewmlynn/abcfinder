from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from app import views

urlpatterns = [
    path('', views.file_upload, name="home"),
    path('queue', views.queue_list, name="queue_list"),
    path('example/', views.demo_example, name="demo_example"),
    path('contact', views.contact, name="contact"),
    path('team', views.team, name="team"),
    path('help', views.help, name="help"),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
