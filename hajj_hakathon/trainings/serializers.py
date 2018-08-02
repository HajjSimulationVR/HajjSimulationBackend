from rest_framework import serializers

from .models import Training


class TrainingSerializser(serializers.ModelSerializer):

    class Meta:
        model = Training
        fields = ('name', 'description', 'image', 'pk')
