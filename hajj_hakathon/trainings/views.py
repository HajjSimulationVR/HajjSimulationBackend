from rest_framework import viewsets, permissions, mixins

from .serializers import TrainingSerializser
from .models import Training


class TrainingViewSet(mixins.ListModelMixin,
                      viewsets.GenericViewSet):

    serializer_class = TrainingSerializser
    queryset = Training.objects.all()
    permission_classes = [permissions.AllowAny]
