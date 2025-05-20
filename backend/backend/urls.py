from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from users import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('community/', include('community.urls')),
    path('cardio/', include('cardio.urls')),
    path('add_feedback/', views.add_feedback_view, name='add_feedback'),
    path('add_contactus/', views.add_contactus_view, name='add_contactus'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
