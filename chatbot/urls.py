from django.urls import path
from . import views

urlpatterns = [
    path('', views.chat_page, name='home'),
    path('chat/', views.chat_page, name='chat_page'),
    path('api/ingest/', views.ingest, name='ingest'),
    path('api/chat/', views.chat, name='chat'),
    path('api/vectordb/', views.vector_db_inspect, name='vector_db_inspect'),
    path('api/rag/', views.rag_api, name='rag_api'),   # <--- Add this
]