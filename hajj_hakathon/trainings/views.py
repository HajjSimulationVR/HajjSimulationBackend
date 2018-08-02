from rest_framework import viewsets, permissions, mixins
from django.views.generic import ListView

from .serializers import TrainingSerializser, TrainingProgressSerializer
from .models import Training, Progress


class TrainingViewSet(mixins.RetrieveModelMixin,
                      mixins.ListModelMixin,
                      viewsets.GenericViewSet):

    serializer_class = TrainingSerializser
    queryset = Training.objects.all()
    permission_classes = [permissions.AllowAny]


class TrainingProgressViewSet(viewsets.ModelViewSet):

    serializer_class = TrainingProgressSerializer
    queryset = Progress.objects.all()
    permission_classes = [permissions.AllowAny]


class TrainingListView(ListView):
    model = Training
    template_name = 'pages/home.html'
    context_object_name = 'trainings'
