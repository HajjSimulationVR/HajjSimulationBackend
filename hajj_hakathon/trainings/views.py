from rest_framework import viewsets, permissions, mixins
from rest_framework.response import Response
from rest_framework import status
from django.views.generic import ListView

from .serializers import TrainingSerializser, TrainingProgressSerializer
from .models import Training, Progress
from hajj_hakathon.users.models import User


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

    def create(self, request, training_pk):
        training = Training.objects.get(pk=int(training_pk)).progresses.filter(user=User.objects.first())
        if training.exists():
            training = training.get()
            return Response(TrainingProgressSerializer(training).data, status=status.HTTP_201_CREATED)
        else:
            return super().create(request, training_pk)


class TrainingListView(ListView):
    model = Training
    template_name = 'pages/trainings.html'
    context_object_name = 'trainings'
